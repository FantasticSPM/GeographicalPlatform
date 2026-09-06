import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EarthquakeService } from './earthquake.service.js';
import { CreateEarthquakeDto } from './dto/create-earthquake.dto.js';
import { UpdateEarthquakeDto } from './dto/update-earthquake.dto.js';

@Controller('earthquake')
export class EarthquakeController {
  constructor(private readonly earthquakeService: EarthquakeService) {}

  @Post()
  create(@Body() createEarthquakeDto: CreateEarthquakeDto) {
    return this.earthquakeService.create(createEarthquakeDto);
  }

  @Get()
  findAll() {
    return this.earthquakeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.earthquakeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEarthquakeDto: UpdateEarthquakeDto) {
    return this.earthquakeService.update(+id, updateEarthquakeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.earthquakeService.remove(+id);
  }
}
