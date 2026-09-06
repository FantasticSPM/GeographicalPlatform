import { PartialType } from '@nestjs/mapped-types';
import { CreateEarthquakeDto } from './create-earthquake.dto.js';

export class UpdateEarthquakeDto extends PartialType(CreateEarthquakeDto) {}
