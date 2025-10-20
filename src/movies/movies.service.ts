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

  findAsync(pageNumber: number, pageSize: number): Promise<Movie[]> {
    return this.moviesRepository.findAsync(pageNumber, pageSize);
  }

  highestGrossingMoviesAsync(
    starting: string,
    ending: string,
  ): Promise<TopGrossingMovieView[]> {
    return this.moviesRepository.highestGrossingMoviesAsync(starting, ending);
  }

  genreSummaryAsync(
    starting: string,
    ending: string,
  ): Promise<GenreSummaryView[]> {
    return this.moviesRepository.genreSummary(starting, ending);
  }

  directorPerformanceAsync(
    starting: string,
    ending: string,
  ): Promise<DirectorPerformanceView[]> {
    return this.moviesRepository.directorPerformance(starting, ending);
  }
}
