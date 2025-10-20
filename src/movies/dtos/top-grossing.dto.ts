import { TopGrossingMovieView } from '../views/top-grossing.view';

export class TopGrossingMovieDto {
  id: number;
  title: string;
  releaseDate: string;
  globalBoxOfficeUsd: number;
  budgetUsd: number;
  returnOnInvestment: number;
  openingShare: number;
}

export namespace TopGrossingMovieDto {
  export function fromView(view: TopGrossingMovieView): TopGrossingMovieDto {
    return {
      id: view.id,
      title: view.title,
      releaseDate: view.releaseDate,
      globalBoxOfficeUsd: view.globalBoxOfficeUsd,
      budgetUsd: view.budgetUsd,
      returnOnInvestment: view.returnOnInvestment,
      openingShare: view.openingShare,
    };
  }
}
