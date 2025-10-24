import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies/entities';
import { Defaults } from './constants/constants';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATASOURCE || Defaults.DATASOURCE,
      synchronize: false,
      cache: false,
      entities: [Movie],
      logging: ['query'],
    }),
  ],
})
export class AppModule {}
