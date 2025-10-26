import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Movies' })
export class Movie {
  /** ID. */
  @PrimaryGeneratedColumn({ name: 'Id', type: 'integer' })
  id: number;

  /** Título. */
  @Column({ name: 'Title', type: 'varchar' })
  title: string | null;

  /** Gênero. */
  @Column({
    name: 'Genre',
    type: 'simple-enum',
    enum: [
      'Drama',
      'Action',
      'Comedy',
      'Thriller',
      'Romance',
      'Sci-Fi',
      'Horror',
      'Documentary',
    ],
  })
  genre: string | null;

  /** Ano de lançamento. */
  @Column({ name: 'ReleaseYear', type: 'integer' })
  releaseYear: number | null;

  /** Data de lançamento, no formato ISO 8601 (YYYY-MM-DD). */
  @Column({ name: 'ReleaseDate', type: 'date' })
  releaseDate: string | null;

  /** País de origem. */
  @Column({ name: 'Country', type: 'varchar' })
  country: string | null;

  /** Orçamento, em dólares americanos (USD). */
  @Column({ name: 'BudgetUsd', type: 'real', precision: 15, scale: 2 })
  budgetUsd: number | null;

  /** Bilheteria nos Estados Unidos, em dólares americanos (USD). */
  @Column({ name: 'UsBoxOfficeUsd', type: 'real', precision: 15, scale: 2 })
  usBoxOfficeUsd: number | null;

  /** Bilheteria global, em dólares americanos (USD). */
  @Column({ name: 'GlobalBoxOfficeUsd', type: 'real', precision: 15, scale: 2 })
  globalBoxOfficeUsd: number | null;

  /** Vendas no primeiro dia, em dólares americanos (USD). */
  @Column({ name: 'OpeningDaySalesUsd', type: 'real', precision: 15, scale: 2 })
  openingDaySalesUsd: number | null;

  /** Vendas na primeira semana, em dólares americanos (USD). */
  @Column({ name: 'OneWeekSalesUsd', type: 'real', precision: 15, scale: 2 })
  oneWeekSalesUsd: number | null;

  /** Avaliação no IMDb (0.0 - 10.0). */
  @Column({ name: 'ImdbRating', type: 'real', precision: 3, scale: 1 })
  imdbRating: number | null;

  /** Avaliação no Rotten Tomatoes (0 - 100). */
  @Column({ name: 'RottenTomatoesScore', type: 'integer' })
  rottenTomatoesScore: number | null;

  /** Quantidade de avaliações no IMDb. */
  @Column({ name: 'NumVotesImdb', type: 'integer' })
  numVotesImdb: number | null;

  /** Quantidade de avaliações no Rotten Tomatoes. */
  @Column({ name: 'NumVotesRottenTomatoes', type: 'integer' })
  numVotesRottenTomatoes: number | null;

  /** Nome do diretor. */
  @Column({ name: 'Director', type: 'varchar' })
  director: string | null;

  /** Nome do ator principal. */
  @Column({ name: 'LeadActor', type: 'varchar' })
  leadActor: string | null;
}

export namespace Movie {
  export function merge(current: Movie, other: Movie): Movie {
    const merged = new Movie();

    merged.id = current.id;
    merged.title = other.title ?? current.title;
    merged.genre = other.genre ?? current.genre;
    merged.releaseYear = other.releaseYear ?? current.releaseYear;
    merged.releaseDate = other.releaseDate ?? current.releaseDate;
    merged.country = other.country ?? current.country;
    merged.budgetUsd = other.budgetUsd ?? current.budgetUsd;
    merged.usBoxOfficeUsd = other.usBoxOfficeUsd ?? current.usBoxOfficeUsd;
    merged.globalBoxOfficeUsd = other.globalBoxOfficeUsd ?? current.globalBoxOfficeUsd;
    merged.openingDaySalesUsd = other.openingDaySalesUsd ?? current.openingDaySalesUsd;
    merged.oneWeekSalesUsd = other.oneWeekSalesUsd ?? current.oneWeekSalesUsd;
    merged.imdbRating = other.imdbRating ?? current.imdbRating;
    merged.rottenTomatoesScore = other.rottenTomatoesScore ?? current.rottenTomatoesScore;
    merged.numVotesImdb = other.numVotesImdb ?? current.numVotesImdb;
    merged.numVotesRottenTomatoes = other.numVotesRottenTomatoes ?? current.numVotesRottenTomatoes;
    merged.director = other.director ?? current.director;
    merged.leadActor = other.leadActor ?? current.leadActor;

    return merged;
  }
}
