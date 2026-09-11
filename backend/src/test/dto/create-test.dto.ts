import { MinLength, MaxLength, IsString } from 'class-validator';

export class CreateTestDto {
  @IsString({ message: '必须是字符串' })
  name: string;
}
