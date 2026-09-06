import { Injectable } from '@nestjs/common';
import { CreateEarthquakeDto } from './dto/create-earthquake.dto.js';
import { UpdateEarthquakeDto } from './dto/update-earthquake.dto.js';

@Injectable()
export class EarthquakeService {
  create(createEarthquakeDto: CreateEarthquakeDto) {
    return 'This action adds a new earthquake';
  }

  findAll() {
    return `This action returns all earthquake`;
  }

  findOne(id: number) {
    return `This action returns a #${id} earthquake`;
  }

  update(id: number, updateEarthquakeDto: UpdateEarthquakeDto) {
    return `This action updates a #${id} earthquake`;
  }

  remove(id: number) {
    return `This action removes a #${id} earthquake`;
  }
}
