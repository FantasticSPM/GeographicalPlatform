import { PartialType } from '@nestjs/mapped-types';
import { CreateTestDto } from './create-test.dto.ts';

export class UpdateTestDto extends PartialType(CreateTestDto) {}
