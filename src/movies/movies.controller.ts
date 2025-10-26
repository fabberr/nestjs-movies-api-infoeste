import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Defaults, Routes } from 'src/common/common.constants';
import {
  DirectorPerformanceDto,
  GenreSummaryDto,
  MovieDto,
  TopGrossingMovieDto,
} from './dtos';

@Controller(Routes.MOVIES)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAsync(
    @Query('pageNumber', ParseIntPipe) pageNumber?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ): Promise<MovieDto[]> {
    const _pageNumber = pageNumber || Defaults.PAGE_NUMBER;
    const _pageSize = pageSize || Defaults.PAGE_SIZE;

    const result = await this.moviesService.findAsync(_pageNumber, _pageSize);
    return result.map(MovieDto.fromEntity);
  }

  @Get('analytics/highest-grossing')
  async highestGrossingMoviesAsync(
    @Query('starting') starting: string,
    @Query('ending') ending: string,
  ): Promise<TopGrossingMovieDto[]> {
    const result = await this.moviesService.highestGrossingMoviesAsync(
      starting,
      ending,
    );
    return result.map(TopGrossingMovieDto.fromView);
  }

  @Get('analytics/genres/summary')
  async genreSummaryAsync(
    @Query('starting') starting: string,
    @Query('ending') ending: string,
  ): Promise<GenreSummaryDto[]> {
    const result = await this.moviesService.genreSummaryAsync(starting, ending);
    return result.map(GenreSummaryDto.fromView);
  }

  @Get('analytics/directors/performance')
  async directorPerformanceAsync(
    @Query('starting') starting: string,
    @Query('ending') ending: string,
  ): Promise<DirectorPerformanceDto[]> {
    const result = await this.moviesService.directorPerformanceAsync(
      starting,
      ending,
    );
    return result.map(DirectorPerformanceDto.fromView);
  }
}
