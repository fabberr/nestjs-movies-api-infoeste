import { GenreSummaryView } from '../views/genre-summary.view';

export class GenreSummaryDto {
  genre: string;
  movieCount: number;
  avgBudgetUsd: number;
  avgGlobalBoxOfficeUsd: number;
  avgImdbRating: number;
}

export namespace GenreSummaryDto {
  export function fromView(view: GenreSummaryView): GenreSummaryDto {
    return {
      genre: view.genre,
      movieCount: view.movieCount,
      avgBudgetUsd: view.avgBudgetUsd,
      avgGlobalBoxOfficeUsd: view.avgGlobalBoxOfficeUsd,
      avgImdbRating: view.avgImdbRating,
    };
  }
}
