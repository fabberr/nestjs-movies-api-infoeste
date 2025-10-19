import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { Defaults, Routes } from 'src/constants/constants';

@Controller(Routes.MOVIES)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAllAsync(
    @Query('page', ParseIntPipe) pageNumber?: number,
    @Query('size', ParseIntPipe) pageSize?: number,
  ): Promise<Movie[]> {
    return await this.moviesService.findAllAsync(
      pageNumber || Defaults.PAGE_NUMBER,
      pageSize || Defaults.PAGE_SIZE,
    );
  }
}
