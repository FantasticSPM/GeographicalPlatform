import { Module } from '@nestjs/common';
import { EarthquakeService } from './earthquake.service.ts';
import { EarthquakeController } from './earthquake.controller.ts';
import { Earthquake } from './entities/earthquake.entity.ts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Earthquake]), AuthModule],
  controllers: [EarthquakeController],
  providers: [EarthquakeService],
})
export class EarthquakeModule {}
