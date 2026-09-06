import { Module } from '@nestjs/common';
import { EarthquakeService } from './earthquake.service.js';
import { EarthquakeController } from './earthquake.controller.js';

@Module({
  controllers: [EarthquakeController],
  providers: [EarthquakeService],
})
export class EarthquakeModule {}
