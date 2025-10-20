import { Movie } from '../entities';

export class MovieDto {
  id: number;
  title: string;
  genre: string;
  releaseYear: number;
  releaseDate: string;
  country: string;
  budgetUsd: number;
  usBoxOfficeUsd: number;
  globalBoxOfficeUsd: number;
  openingDaySalesUsd: number;
  oneWeekSalesUsd: number;
  imdbRating: number;
  rottenTomatoesScore: number;
  numVotesImdb: number;
  numVotesRottenTomatoes: number;
  director: string;
  leadActor: string;
}

export namespace MovieDto {
  export function fromEntity(entity: Movie): MovieDto {
    return {
      id: entity.id,
      title: entity.title,
      genre: entity.genre,
      releaseYear: entity.releaseYear,
      releaseDate: entity.releaseDate,
      country: entity.country,
      budgetUsd: entity.budgetUsd,
      usBoxOfficeUsd: entity.usBoxOfficeUsd,
      globalBoxOfficeUsd: entity.globalBoxOfficeUsd,
      openingDaySalesUsd: entity.openingDaySalesUsd,
      oneWeekSalesUsd: entity.oneWeekSalesUsd,
      imdbRating: entity.imdbRating,
      rottenTomatoesScore: entity.rottenTomatoesScore,
      numVotesImdb: entity.numVotesImdb,
      numVotesRottenTomatoes: entity.numVotesRottenTomatoes,
      director: entity.director,
      leadActor: entity.leadActor,
    };
  }
}
