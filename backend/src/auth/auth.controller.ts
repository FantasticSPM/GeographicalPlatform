import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Req,
  Res,
  Ip,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { LogoutDto } from './dto/logout.dto.js';
import type { UserProfile } from '../common/interfaces/auth.interface.js';
import type { ApiResponse } from '../common/interfaces/api-response.interface.js';
import type { Request, Response as ExpressResponse } from 'express';
import { AccessTokenGuard } from './guards/access-token.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto): Promise<any> {
    const data = await this.authService.register(createAuthDto ?? {});
    return data;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Ip() ip: string,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    const data = await this.authService.login(loginDto ?? {}, ip);

    const { access_token, refresh_token } = data;

    // 4. 写入 Cookie
    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    delete data.password;
    delete data.access_token;
    delete data.refresh_token;
    return data;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<any> {
    const data = await this.authService.refresh(refreshTokenDto);
    return data;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async logout(@Req() request): Promise<any> {
    await this.authService.logout(request);
    return null;
  }
}
