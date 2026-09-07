import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { LogoutDto } from './dto/logout.dto.js';
import type {
  AuthenticatedRequest,
  AuthTokens,
  UserProfile,
} from '../common/interfaces/auth.interface.js';
import type { ApiResponse } from '../common/interfaces/api-response.interface.js';
import { Response as ApiResponseFactory } from '../common/interceptors/Response.js';
import type { Request, Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    try {
      const data = await this.authService.register(createAuthDto);
      return ApiResponseFactory.success(data, '注册成功');
    } catch (e: any) {
      return ApiResponseFactory.error(e?.message || '注册失败', 400);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Body() loginDto: LoginDto,
  ) {
    try {
      const data = await this.authService.login(loginDto, request, response);
      return ApiResponseFactory.success(data, '登录成功');
    } catch (e: any) {
      return ApiResponseFactory.error(e?.message || '登录失败', 400);
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<ApiResponse<AuthTokens>> {
    const data = await this.authService.refresh(refreshTokenDto);
    return ApiResponseFactory.success(data, 'Token 刷新成功');
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() request: AuthenticatedRequest,
    @Body() logoutDto: LogoutDto,
  ): Promise<ApiResponse<null>> {
    await this.authService.logout(request.user.id, logoutDto);
    return ApiResponseFactory.success(null, '退出登录成功');
  }

  @Get('me')
  async me(
    @Req() request: AuthenticatedRequest,
  ): Promise<ApiResponse<UserProfile>> {
    console.log(2);
    const data = await this.authService.me(request?.user?.id);
    return ApiResponseFactory.success(data);
  }
}
