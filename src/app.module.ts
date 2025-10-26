import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Defaults } from './common/common.constants';
import { CommonModule } from './common/common.module';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATASOURCE || Defaults.DATASOURCE,
      synchronize: false,
      cache: false,
      entities: [Movie],
      logging: ['query'],
    }),
    CommonModule,
    MoviesModule,
  ],
})
export class AppModule {}
