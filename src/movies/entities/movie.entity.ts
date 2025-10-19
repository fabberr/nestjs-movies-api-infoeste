import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  releaseYear: number;

  @Column()
  releaseDate: string;

  @Column()
  country: string;

  @Column()
  budgetUsd: number;

  @Column()
  usBoxOfficeUsd: number;

  @Column()
  globalBoxOfficeUsd: number;

  @Column()
  openingDaySalesUsd: number;

  @Column()
  oneWeekSalesUsd: number;

  @Column()
  imdbRating: number;

  @Column()
  rottenTomatoesScore: number;

  @Column()
  numVotesImdb: number;

  @Column()
  numVotesRottenTomatoes: number;

  @Column()
  director: string;

  @Column()
  leadActor: string;
}
