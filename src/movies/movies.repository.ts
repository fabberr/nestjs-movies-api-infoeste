import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DirectorPerformanceView,
  GenreSummaryView,
  TopGrossingMovieView,
} from './views';
import { Movie } from './entities';

@Injectable()
export class MoviesRepository {
  private readonly table: string;
  private readonly columns: Record<string, string>;

  constructor(
    @InjectRepository(Movie)
    private readonly database: Repository<Movie>,
  ) {
    const metadata = this.database.manager.connection.getMetadata(Movie);
    this.table = metadata.tableName;
    this.columns = Object.fromEntries(
      metadata.columns.map(column => [column.propertyName, column.databaseName])
    );
  }

  async findAsync(pageNumber: number, pageSize: number): Promise<Movie[]> {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    return this.database.find({
      order: { releaseDate: 'desc' },
      skip: skip,
      take: take,
    });
  }

  async highestGrossingMoviesAsync(
    starting: string,
    ending: string,
  ): Promise<TopGrossingMovieView[]> {
    return this.database
      .createQueryBuilder(this.table)
      .select([
        `${this.table}.${this.columns.id} AS "id"`,
        `${this.table}.${this.columns.title} AS "title"`,
        `${this.table}.${this.columns.releaseDate} AS "releaseDate"`,
        `${this.table}.${this.columns.globalBoxOfficeUsd} AS "globalBoxOfficeUsd"`,
        `${this.table}.${this.columns.budgetUsd} AS "budgetUsd"`,
        `${this.table}.${this.columns.globalBoxOfficeUsd} / ${this.table}.${this.columns.budgetUsd} AS "returnOnInvestment"`,
        `${this.table}.${this.columns.openingDaySalesUsd} / ${this.table}.${this.columns.globalBoxOfficeUsd} AS "openingShare"`,
      ])
      .where(`${this.table}.${this.columns.releaseDate} BETWEEN :starting AND :ending`, {
        starting: starting,
        ending: ending,
      })
      .orderBy(`${this.table}.${this.columns.globalBoxOfficeUsd}`, 'DESC')
      .getRawMany<TopGrossingMovieView>();
  }

  async genreSummary(
    starting: string,
    ending: string,
  ): Promise<GenreSummaryView[]> {
    return this.database
      .createQueryBuilder(this.table)
      .select([
        `${this.table}.${this.columns.genre} AS "genre"`,
        `COUNT(*) AS "movieCount"`,
        `AVG(${this.table}.${this.columns.budgetUsd}) AS "avgBudgetUsd"`,
        `AVG(${this.table}.${this.columns.globalBoxOfficeUsd}) AS "avgGlobalBoxOfficeUsd"`,
        `AVG(${this.table}.${this.columns.imdbRating}) AS "avgImdbRating"`,
      ])
      .where(`${this.table}.${this.columns.releaseDate} BETWEEN :starting AND :ending`, {
        starting: starting,
        ending: ending,
      })
      .groupBy(`${this.table}.${this.columns.genre}`)
      .orderBy('"movieCount"', 'DESC')
      .getRawMany<GenreSummaryView>();
  }

  async directorPerformance(
    starting: string,
    ending: string,
  ): Promise<DirectorPerformanceView[]> {
    return this.database
      .createQueryBuilder(this.table)
      .select([
        `${this.table}.${this.columns.director} AS "director"`,
        `COUNT(*) AS "movieCount"`,
        `SUM(${this.table}.${this.columns.globalBoxOfficeUsd}) AS "totalGlobalBoxOfficeUsd"`,
        `AVG(${this.table}.${this.columns.imdbRating}) AS "avgImdbRating"`,
      ])
      .where(`${this.table}.${this.columns.releaseDate} BETWEEN :starting AND :ending`, {
        starting: starting,
        ending: ending,
      })
      .groupBy(`${this.table}.${this.columns.director}`)
      .orderBy('"totalGlobalBoxOfficeUsd"', 'DESC')
      .getRawMany<DirectorPerformanceView>();
  }
}
