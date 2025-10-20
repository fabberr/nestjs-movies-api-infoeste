import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/redis/redis.module';
import { Movie } from './entities';
import { MoviesController, MoviesRepository, MoviesService } from '.';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), RedisModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
