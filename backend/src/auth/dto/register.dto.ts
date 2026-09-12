import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  IsOptional,
} from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty({
    message: '用户名不应为为空',
  })
  @Matches(/^[A-Za-z][A-Za-z0-9_]{3,9}$/, {
    message:
      '账号必须为 4～10 位，只能包含英文字母、数字和下划线，且必须以英文字母开头。',
  })
  username: string;

  @IsNotEmpty({
    message: '密码不应为为空',
  })
  @Matches(/^(?=.*[A-Za-z])[A-Za-z0-9_]{8,16}$/, {
    message:
      '密码需要包含 8～16 位的字母、数字、下划线，并且必须至少包含一个字母！',
  })
  password: string;

  @IsOptional()
  @IsString({
    message: '昵称必须为字符串',
  })
  nick_name?: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  @IsEmail(undefined, {
    message: '邮箱格式不正确',
  })
  email?: string;
}
