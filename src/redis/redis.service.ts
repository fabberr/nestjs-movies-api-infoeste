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
   * Remove um objeto armazenado no Redis pela sua chave.
   *
   * @see https://redis.io/docs/latest/commands/unlink/
   *
   * @param key Chave do objeto.
   */
  async deleteObjectAsync(key: string): Promise<void> {
    await this.client.unlink(key);
  }
}
