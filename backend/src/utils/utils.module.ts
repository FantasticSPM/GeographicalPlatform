import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service.js';
import { CacheService } from './cache.service.ts';

@Module({
  controllers: [],
  providers: [UtilsService, CacheService],
  exports: [UtilsService, CacheService],
})
export class UtilsModule {}
