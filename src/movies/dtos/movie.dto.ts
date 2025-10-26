import { Movie } from '../entities';

export class MovieDto {
  id: number;
  title: string | null;
  genre: string | null;
  releaseYear: number | null;
  releaseDate: string | null;
  country: string | null;
  budgetUsd: number | null;
  usBoxOfficeUsd: number | null;
  globalBoxOfficeUsd: number | null;
  openingDaySalesUsd: number | null;
  oneWeekSalesUsd: number | null;
  imdbRating: number | null;
  rottenTomatoesScore: number | null;
  numVotesImdb: number | null;
  numVotesRottenTomatoes: number | null;
  director: string | null;
  leadActor: string | null;
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
