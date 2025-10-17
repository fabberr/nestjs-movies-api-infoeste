import process from 'process';
import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies/entities/movie.entity';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATASOURCE,
      synchronize: false,
      cache: false,
      entities: [Movie],
    }),
  ],
})
export class AppModule {}
