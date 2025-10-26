import { Movie } from '../entities';

export class UpdateMovieDto {
  id: number;
  title?: string;
  genre?: string;
  releaseYear?: number;
  releaseDate?: string;
  country?: string;
  budgetUsd?: number;
  usBoxOfficeUsd?: number;
  globalBoxOfficeUsd?: number;
  openingDaySalesUsd?: number;
  oneWeekSalesUsd?: number;
  imdbRating?: number;
  rottenTomatoesScore?: number;
  numVotesImdb?: number;
  numVotesRottenTomatoes?: number;
  director?: string;
  leadActor?: string;
}

export namespace UpdateMovieDto {
  export function toEntity(dto: UpdateMovieDto): Movie {
    return {
      id: dto.id,
      title: dto.title ?? null,
      genre: dto.genre ?? null,
      releaseYear: dto.releaseYear ?? null,
      releaseDate: dto.releaseDate ?? null,
      country: dto.country ?? null,
      budgetUsd: dto.budgetUsd ?? null,
      usBoxOfficeUsd: dto.usBoxOfficeUsd ?? null,
      globalBoxOfficeUsd: dto.globalBoxOfficeUsd ?? null,
      openingDaySalesUsd: dto.openingDaySalesUsd ?? null,
      oneWeekSalesUsd: dto.oneWeekSalesUsd ?? null,
      imdbRating: dto.imdbRating ?? null,
      rottenTomatoesScore: dto.rottenTomatoesScore ?? null,
      numVotesImdb: dto.numVotesImdb ?? null,
      numVotesRottenTomatoes: dto.numVotesRottenTomatoes ?? null,
      director: dto.director ?? null,
      leadActor: dto.leadActor ?? null,
    };
  }
}
