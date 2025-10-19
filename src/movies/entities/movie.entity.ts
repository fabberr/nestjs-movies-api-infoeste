import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  /** ID. */
  @PrimaryGeneratedColumn({ name: 'Id', type: 'integer' })
  id: number;

  /** Título. */
  @Column({ name: 'Title', type: 'varchar' })
  title: string;

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
  genre: string;

  /** Ano de lançamento. */
  @Column({ name: 'ReleaseYear', type: 'integer' })
  releaseYear: number;

  /** Data de lançamento, no formato ISO 8601 (yyyy-MM-dd). */
  @Column({ name: 'ReleaseDate', type: 'date' })
  releaseDate: string;

  /** País de origem. */
  @Column({ name: 'Country', type: 'varchar' })
  country: string;

  /** Orçamento, em dólares americanos (USD). */
  @Column({ name: 'BudgetUsd', type: 'real', precision: 15, scale: 2 })
  budgetUsd: number;

  /** Bilheteria nos Estados Unidos, em dólares americanos (USD). */
  @Column({ name: 'UsBoxOfficeUsd', type: 'real', precision: 15, scale: 2 })
  usBoxOfficeUsd: number;

  /** Bilheteria global, em dólares americanos (USD). */
  @Column({ name: 'GlobalBoxOfficeUsd', type: 'real', precision: 15, scale: 2 })
  globalBoxOfficeUsd: number;

  /** Vendas no primeiro dia, em dólares americanos (USD). */
  @Column({ name: 'OpeningDaySalesUsd', type: 'real', precision: 15, scale: 2 })
  openingDaySalesUsd: number;

  /** Vendas na primeira semana, em dólares americanos (USD). */
  @Column({ name: 'OneWeekSalesUsd', type: 'real', precision: 15, scale: 2 })
  oneWeekSalesUsd: number;

  /** Avaliação no IMDb (0.0 - 10.0). */
  @Column({ name: 'ImdbRating', type: 'real', precision: 3, scale: 1 })
  imdbRating: number;

  /** Avaliação no Rotten Tomatoes (0 - 100). */
  @Column({ name: 'RottenTomatoesScore', type: 'integer' })
  rottenTomatoesScore: number;

  /** Quantidade de avaliações no IMDb. */
  @Column({ name: 'NumVotesImdb', type: 'integer' })
  numVotesImdb: number;

  /** Quantidade de avaliações no Rotten Tomatoes. */
  @Column({ name: 'NumVotesRottenTomatoes', type: 'integer' })
  numVotesRottenTomatoes: number;

  /** Nome do diretor. */
  @Column({ name: 'Director', type: 'varchar' })
  director: string;

  /** Nome do ator principal. */
  @Column({ name: 'LeadActor', type: 'varchar' })
  leadActor: string;
}
