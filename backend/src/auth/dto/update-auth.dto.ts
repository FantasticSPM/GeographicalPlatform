import { PartialType } from '@nestjs/mapped-types';
import { RegisterAuthDto } from './register.dto.js';

export class UpdateAuthDto extends PartialType(RegisterAuthDto) {}
