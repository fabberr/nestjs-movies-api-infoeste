import { Module } from '@nestjs/common';
import { RedisService } from '.';

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
