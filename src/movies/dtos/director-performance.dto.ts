import { DirectorPerformanceView } from '../views/director-performance.view';

export class DirectorPerformanceDto {
  director: string;
  movieCount: number;
  totalGlobalBoxOfficeUsd: number;
  avgImdbRating: number;
}

export namespace DirectorPerformanceDto {
  export function fromView(
    view: DirectorPerformanceView,
  ): DirectorPerformanceDto {
    return {
      director: view.director,
      movieCount: view.movieCount,
      totalGlobalBoxOfficeUsd: view.totalGlobalBoxOfficeUsd,
      avgImdbRating: view.avgImdbRating,
    };
  }
}
