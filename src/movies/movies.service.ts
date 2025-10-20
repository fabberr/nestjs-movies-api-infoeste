import { Injectable } from '@nestjs/common';
import {
  TopGrossingMovieView,
  GenreSummaryView,
  DirectorPerformanceView,
} from './views';
import { MoviesRepository } from './movies.repository';
import { Movie } from './entities';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async findAsync(pageNumber: number, pageSize: number): Promise<Movie[]> {
    return await this.moviesRepository.findAsync(pageNumber, pageSize);
  }

  async highestGrossingMoviesAsync(
    starting: string,
    ending: string,
  ): Promise<TopGrossingMovieView[]> {
    return await this.moviesRepository.highestGrossingMoviesAsync(
      starting,
      ending,
    );
  }

  async genreSummaryAsync(
    starting: string,
    ending: string,
  ): Promise<GenreSummaryView[]> {
    return await this.moviesRepository.genreSummaryAsync(starting, ending);
  }

  async directorPerformanceAsync(
    starting: string,
    ending: string,
  ): Promise<DirectorPerformanceView[]> {
    return await this.moviesRepository.directorPerformanceAsync(
      starting,
      ending,
    );
  }
}
