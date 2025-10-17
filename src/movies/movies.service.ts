import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAllAsync(pageNumber: number, pageSize: number): Promise<Movie[]> {
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    return await this.movieRepository.find({
      order: { releaseDate: 'desc' },
      skip: skip,
      take: take,
    });
  }
}
