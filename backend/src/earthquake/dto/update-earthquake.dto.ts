import { PartialType } from '@nestjs/mapped-types';
import { CreateEarthquakeDto } from './create-earthquake.dto.ts';

export class UpdateEarthquakeDto extends PartialType(CreateEarthquakeDto) {}
