import { Injectable, Logger } from '@nestjs/common';
import {
  TopGrossingMovieView,
  GenreSummaryView,
  DirectorPerformanceView,
} from './views';
import { MoviesRepository } from './movies.repository';
import { Movie } from './entities';
import { RedisService } from 'src/redis';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly redisService: RedisService,
  ) {}

  async findAllAsync(pageNumber: number, pageSize: number): Promise<Movie[]> {
    const key = `movies:find_all:pageNumber=${pageNumber}:pageSize=${pageSize}`;
    const ttlSeconds = 15 * 60; // 15 minutos

    const cachedMovies = await this.redisService.getObjectAsync<Movie[]>(key);
    if (cachedMovies !== null) {
      this.logger.debug(`Cache hit: key="${key}"`);
      return cachedMovies;
    }
    this.logger.debug(`Cache miss: key="${key}"`);

    const movies = await this.moviesRepository.findAllAsync(
      pageNumber,
      pageSize,
    );

    await this.redisService.setObjectAsync<Movie[]>(key, movies, ttlSeconds);

    return movies;
  }

  async findByIdAsync(id: number): Promise<Movie | null> {
    const key = `movie:${id}`;
    const ttlSeconds = 5 * 60;

    return await this.redisService.lazyLoadAsync<Movie | null>(
      key,
      () => this.moviesRepository.findByIdAsync(id),
      ttlSeconds,
    );
  }

  async updateAsync(id: number, movie: Movie): Promise<Movie | null> {
    const currentMovie = await this.moviesRepository.findByIdAsync(id);

    if (currentMovie === null) {
      return null;
    }

    const updatedMovie = await this.moviesRepository.updateAsync(
      Movie.merge(currentMovie, movie),
    );

    await this.redisService.updateObjectAsync<Movie>(
      `movie:${id}`,
      updatedMovie!,
    );

    // Como não temos como saber, de forma simples, quais consultas esta
    // atualização pode afetar, invalidamos todas as chaves relacionadas.
    await this.redisService.deleteByPatternAsync('movies:*');

    return updatedMovie;
  }

  async highestGrossingMoviesAsync(
    starting: string,
    ending: string,
  ): Promise<TopGrossingMovieView[]> {
    const key = `movies:analytics:highest_grossing:stating=${starting}:ending=${ending}`;
    const ttlSeconds = 60 * 60; // 60 minutos

    const result = await this.redisService.lazyLoadAsync<
      TopGrossingMovieView[]
    >(
      key,
      () => this.moviesRepository.highestGrossingMoviesAsync(starting, ending),
      ttlSeconds,
    );

    return result ?? [];
  }

  async genreSummaryAsync(
    starting: string,
    ending: string,
  ): Promise<GenreSummaryView[]> {
    const key = `movies:analytics:genre_summary:stating=${starting}:ending=${ending}`;
    const ttlSeconds = 60 * 60; // 60 minutos

    const result = await this.redisService.lazyLoadAsync(
      key,
      () => this.moviesRepository.genreSummaryAsync(starting, ending),
      ttlSeconds,
    );

    return result ?? [];
  }

  async directorPerformanceAsync(
    starting: string,
    ending: string,
  ): Promise<DirectorPerformanceView[]> {
    const key = `movies:analytics:director_performance:stating=${starting}:ending=${ending}`;
    const ttlSeconds = 60 * 60; // 60 minutos

    const result = await this.redisService.lazyLoadAsync(
      key,
      () => this.moviesRepository.directorPerformanceAsync(starting, ending),
      ttlSeconds,
    );

    return result ?? [];
  }
}
