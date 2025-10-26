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

  async findAllAsync(pageNumber: number, pageSize: number): Promise<Movie[]> {
    return await this.moviesRepository.findAllAsync(pageNumber, pageSize);
  }

  async findByIdAsync(id: number): Promise<Movie | null> {
    return await this.moviesRepository.findByIdAsync(id);
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
