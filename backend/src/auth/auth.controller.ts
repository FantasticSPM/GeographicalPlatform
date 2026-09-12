import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Req,
  Res,
  Headers,
  Ip,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AuthService } from './services/auth.service.ts';
import { RegisterAuthDto } from './dto/register.dto.ts';
import { LoginDto } from './dto/login.dto.ts';
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { AccessTokenGuard } from './guards/access-token.guard.ts';
import { define, generateRandomNickname } from '../common/tools/index.ts';
import { UserService } from './services/user.service.ts';
import bcrypt from 'bcrypt';
import type { AuthenticatedRequest } from '../common/interfaces/auth.interface.ts';
import { UtilsService } from '../utils/utils.service.ts';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly utilsService: UtilsService,
  ) {}

  @Post('register')
  async register(@Body() createAuthDto: RegisterAuthDto): Promise<any> {
    // 判断是否有昵称
    if (!define(createAuthDto.nick_name)) {
      createAuthDto.nick_name = generateRandomNickname();
    }

    // 判断用户名是否存在
    const existingUser = await this.userService.findOneByUserName(
      createAuthDto.username,
    );

    if (existingUser) {
      throw new BadRequestException('用户名已存在!');
    }
    const passwordHash = await bcrypt.hash(createAuthDto.password, 12);

    // 创建用户。预查询只能优化正常场景，不能解决并发竞态；最终以数据库唯一约束为准。
    let newUser;
    try {
      newUser = await this.userService.create({
        ...createAuthDto,
        password: passwordHash,
      });
    } catch (error) {
      if (isUsernameUniqueViolation(error)) {
        throw new BadRequestException('用户名已存在!');
      }
      throw error;
    }

    delete newUser.password;
    return newUser;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    const user = await this.userService.findOneByUserName(loginDto.username);
    if (!user) {
      throw new BadRequestException('用户不存在!');
    }
    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('密码错误!');
    }

    const _ip = ip?.replace(/^::ffff:/, '').replace(/^::1$/, '127.0.0.1');

    const currentDate = new Date();
    const expiresAt = new Date(+currentDate + 1000 * 60 * 60 * 24 * 7);
    const deviceInfo = this.utilsService.getDeviceInfo(userAgent);

    const session = await this.authService.create({
      user_id: user.id,
      ip_address: _ip,
      expires_at: expiresAt,
      last_login_at: currentDate,
      device: deviceInfo,
    });

    const { access_token, refresh_token } =
      await this.authService.generateTokens(user.id, session.id);

    const refresh_token_hash = this.authService.hashRefreshToken(refresh_token);

    const _session = await this.authService.updateRefreshTokenHash({
      sessionId: session.id,
      refreshTokenHash: refresh_token_hash,
    });
    if (!_session) {
      throw new BadRequestException('登录失败!');
    }

    //  写入 Cookie
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
    delete user.password;
    return user;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: ExpressRequest,
    @Res({
      passthrough: true,
    })
    response: ExpressResponse,
  ): Promise<any> {
    const refreshToken = req.cookies['refresh_token'];
    const { access_token, refresh_token } =
      await this.authService.refreshAccessToken(refreshToken);
    //  写入 Cookie
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
    return;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async logout(
    @Req() request,
    @Res({
      passthrough: true,
    })
    response: ExpressResponse,
  ): Promise<any> {
    const refreshToken = request.cookies['refresh_token'];
    await this.authService.logout(refreshToken);
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });
    response.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return null;
  }

  @Post('logoutAll')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async logoutAll(
    @Req() request,
    @Res({
      passthrough: true,
    })
    response: ExpressResponse,
  ): Promise<any> {
    const refreshToken = request.cookies['refresh_token'];
    await this.authService.logoutAll(refreshToken);
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });
    response.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return null;
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async me(@Req() request: AuthenticatedRequest) {
    const data = await this.userService.findOneById(String(request.user.id));
    delete data.password;
    return data;
  }
}

function isUsernameUniqueViolation(error: unknown): boolean {
  if (!(error instanceof QueryFailedError)) return false;

  const driverError = error.driverError as {
    code?: string;
    detail?: string;
  };

  // PostgreSQL duplicate key 错误码为 23505。当前 User 实体中唯一字段是 username。
  return (
    driverError.code === '23505' &&
    (driverError.detail?.includes('(username)') ?? false)
  );
}
