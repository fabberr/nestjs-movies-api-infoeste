import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import * as redis from 'redis';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client!: RedisClientType;

  async onModuleInit(): Promise<void> {
    this.client = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    this.client.on('error', (error) =>
      this.logger.error('Redis client error:', error),
    );

    await this.client.connect();

    this.logger.log('Redis client connected.');
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
    this.logger.log('Redis client disconnected.');
  }

  /**
   * Recupera um objeto armazenado no Redis pela sua chave.
   *
   * @see https://redis.io/docs/latest/commands/get/
   *
   * @param key Chave do objeto.
   *
   * @return O objeto armazenado em cache.
   */
  async getObjectAsync<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  /**
   * Armazena um objeto no Redis com a chave especificada. Caso um objeto com
   * a chave especifica já exista, ele será sobrescrito.
   *
   * @see https://redis.io/docs/latest/commands/set/
   *
   * @param key Chave do objeto.
   * @param value Objeto a armazenar.
   * @param ttlSeconds (Opcional) Tempo de vida (TTL) do objeto, em segundos.
   *        Se não especificao, o objeto será armazenado indefinidamente.
   */
  async setObjectAsync<T>(
    key: string,
    value: T,
    ttlSeconds?: number,
  ): Promise<void> {
    const json = JSON.stringify(value);

    if (ttlSeconds && ttlSeconds > 0) {
      await this.client.set(key, json, {
        expiration: { type: 'EX', value: ttlSeconds },
      });
    } else {
      await this.client.set(key, json);
    }
  }

  /**
   * Atualiza um objeto armazenado no Redis pela sua chave. A chave especificada
   * deve existir. O tempo de vida da chave será mantido.
   *
   * @see https://redis.io/docs/latest/commands/set/
   *
   * @param key Chave do objeto.
   * @param value Objeto a atualizar.
   */
  async updateObjectAsync<T>(key: string, value: T): Promise<void> {
    const json = JSON.stringify(value);

    await this.client.set(key, json, {
      expiration: { type: 'KEEPTTL' },
      condition: 'XX',
    });
  }

  /**
   * Remove um objeto armazenado no Redis pela sua chave.
   *
   * @see https://redis.io/docs/latest/commands/unlink/
   *
   * @param key Chave do objeto.
   */
  async deleteObjectAsync(key: string): Promise<void> {
    const count = await this.client.unlink(key);

    if (count > 0) {
      this.logger.debug(`1 chave deletada: ${key}`);
    }
  }

  /**
   * Remove todas as chaves armazenadas no Redis que correspondem ao pattern
   * informado.
   *
   * @see https://redis.io/docs/latest/commands/scan/
   * @see https://redis.io/docs/latest/commands/unlink/
   *
   * @param pattern Pattern de busca.
   */
  async deleteByPatternAsync(pattern: string): Promise<void> {
    const keysToDelete: string[] = [];

    for await (const keys of this.client.scanIterator({ MATCH: pattern })) {
      keysToDelete.push(...keys);
    }

    this.logger.debug(
      `${keysToDelete.length} chaves para deletar: ${keysToDelete}`,
    );

    if (keysToDelete.length === 0) {
      return;
    }

    const count = await this.client.unlink(keysToDelete);
    this.logger.debug(`${count} chaves deletadas.`);
  }

  /**
   * Implementa o padrão **lazy loading** (cache-aside) para um objeto ou coleção.
   *
   * O método tenta primeiro obter o valor associado à chave informada a partir
   * do cache. Caso o valor exista (*cache hit*), ele é retornado imediatamente.
   *
   * Caso contrário (*cache miss*), a função `fetchFn` é chamada para buscar o
   * valor. Se `fetchFn` retornar um valor não nulo, este será armazenado em
   * cache com o TTL especificado (se informado) antes de ser retornado.
   *
   * @template T Tipo do objeto ou coleção a ser armazenado em cache.
   *
   * @param key Chave única do objeto em cache.
   *
   * @param fetchFn Função de callback chamada quando o valor não está presente no cache.
   *        Deve retornar o valor a ser armazenado (por exemplo, uma entidade ou lista),
   *        ou `null` se não houver dados disponíveis.
   *
   * @param ttlSeconds (Opcional) Tempo de vida (TTL) do objeto, em segundos.
   *        Se não especificado, o valor será armazenado indefinidamente.
   *
   * @returns O valor obtido do cache ou, em caso de cache miss, o valor retornado por `fetchFn`.  
   *          Retorna `null` se ambos (cache e `fetchFn`) não produzirem resultado.
   */
  async lazyLoadAsync<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttlSeconds?: number,
  ): Promise<T | null> {
    const cachedValue = await this.getObjectAsync<T>(key);
    if (cachedValue !== null) {
      this.logger.debug(`Cache hit: key="${key}"`);
      return cachedValue;
    }

    this.logger.debug(`Cache miss: key="${key}"`);

    const value = await fetchFn();

    if (value === null) {
      return null;
    }

    await this.setObjectAsync<T>(key, value, ttlSeconds);
    return value;
  }
}
