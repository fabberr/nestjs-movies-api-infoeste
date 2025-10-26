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
    private readonly redisService: RedisService
  ) {}

  async findAllAsync(pageNumber: number, pageSize: number): Promise<Movie[]> {
    const key = `movies:find_all:pageNumber=${pageNumber}:pageSize=${pageSize}`;
    const ttlSeconds = (15 * 60); // 15 minutos

    const cachedMovies = await this.redisService.getObjectAsync<Movie[]>(key);
    if (cachedMovies !== null) {
      this.logger.debug(`Cache hit: key="${key}"`);
      return cachedMovies;
    }
    this.logger.debug(`Cache miss: key="${key}"`);

    const movies = await this.moviesRepository.findAllAsync(pageNumber, pageSize);

    await this.redisService.setObjectAsync<Movie[]>(key, movies, ttlSeconds);

    return movies;
  }

  async findByIdAsync(id: number): Promise<Movie | null> {
    const key: string = `movie:${id}`;
    const ttlSeconds = (5 * 60); // 5 minutos

    const cachedMovie = await this.redisService.getObjectAsync<Movie>(key);
    if (cachedMovie !== null) {
      this.logger.debug(`Cache hit: key="${key}"`);
      return cachedMovie;
    }
    this.logger.debug(`Cache miss: key="${key}"`);

    const movie = await this.moviesRepository.findByIdAsync(id);

    if (movie === null) {
      return null;
    }

    await this.redisService.setObjectAsync<Movie>(key, movie, ttlSeconds);
    return movie;
  }

  async updateAsync(id: number, movie: Movie): Promise<Movie | null> {
    const currentMovie = await this.moviesRepository.findByIdAsync(id);

    if (currentMovie === null) {
      return null;
    }

    return await this.moviesRepository.updateAsync(
      Movie.merge(currentMovie, movie),
    );
  }

  async highestGrossingMoviesAsync(
    starting: string,
    ending: string,
  ): Promise<TopGrossingMovieView[]> {
    const key = `movies:analytics:highest_grossing:stating=${starting}:ending=${ending}`;
    const ttlSeconds = (60 * 60); // 60 minutos

    const cached = await this.redisService.getObjectAsync<TopGrossingMovieView[]>(key);
    if (cached !== null) {
      this.logger.debug(`Cache hit: key="${key}"`);
      return cached;
    }
    this.logger.debug(`Cache miss: key="${key}"`);

    const result = await this.moviesRepository.highestGrossingMoviesAsync(
      starting,
      ending
    );

    await this.redisService.setObjectAsync<TopGrossingMovieView[]>(key, result, ttlSeconds);

    return result;
  }

  async genreSummaryAsync(
    starting: string,
    ending: string,
  ): Promise<GenreSummaryView[]> {
    const key = `movies:analytics:genre_summary:stating=${starting}:ending=${ending}`;
    const ttlSeconds = (60 * 60); // 60 minutos

    const cached = await this.redisService.getObjectAsync<GenreSummaryView[]>(key);
    if (cached !== null) {
      this.logger.debug(`Cache hit: key="${key}"`);
      return cached;
    }
    this.logger.debug(`Cache miss: key="${key}"`);

    const result = await this.moviesRepository.genreSummaryAsync(starting, ending);

    await this.redisService.setObjectAsync<GenreSummaryView[]>(key, result, ttlSeconds);

    return result;
  }

  async directorPerformanceAsync(
    starting: string,
    ending: string,
  ): Promise<DirectorPerformanceView[]> {
    const key = `movies:analytics:director_performance:stating=${starting}:ending=${ending}`;
    const ttlSeconds = (60 * 60); // 60 minutos

    const cached = await this.redisService.getObjectAsync<DirectorPerformanceView[]>(key);
    if (cached !== null) {
      this.logger.debug(`Cache hit: key="${key}"`);
      return cached;
    }
    this.logger.debug(`Cache miss: key="${key}"`);

    const result = await this.moviesRepository.directorPerformanceAsync(
      starting,
      ending
    );

    await this.redisService.setObjectAsync<DirectorPerformanceView[]>(key, result, ttlSeconds);

    return result;
  }
}
