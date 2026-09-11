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
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './services/auth.service.js';
import { RegisterAuthDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { AccessTokenGuard } from './guards/access-token.guard.js';
import { define, generateRandomNickname } from '../common/tools/index.js';
import { UserService } from './services/user.service.js';
import bcrypt from 'bcrypt';
import type { AuthenticatedRequest } from '../common/interfaces/auth.interface.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() createAuthDto: RegisterAuthDto): Promise<any> {
    // 判断是否有用户名
    if (!define(createAuthDto.username)) {
      throw new BadRequestException('用户名不能为空!');
    }

    const usernameReg = /^[A-Za-z][A-Za-z0-9_]{3,9}$/;
    if (!usernameReg.test(createAuthDto.username)) {
      throw new BadRequestException(
        '账号必须为 4～10 位，只能包含英文字母、数字和下划线，且必须以英文字母开头。',
      );
    }

    // 判断是否有密码
    if (!define(createAuthDto.password)) {
      throw new BadRequestException('密码不能为空!');
    }

    const passwordReg = /^(?=.*[A-Za-z])[A-Za-z0-9_]{8,16}$/;
    if (!passwordReg.test(createAuthDto.password)) {
      throw new BadRequestException(
        '密码需要包含 8～16 位的字母、数字、下划线，并且必须至少包含一个字母！',
      );
    }

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

    // 创建用户
    const newUser = await this.userService.create({
      ...createAuthDto,
      password: passwordHash,
    });

    delete newUser.password;
    return newUser;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Ip() ip: string,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    if (!define(loginDto.username)) {
      throw new BadRequestException('用户名不能为空!');
    }
    if (!define(loginDto.password)) {
      throw new BadRequestException('密码不能为空!');
    }
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

    const session = await this.authService.create({
      user_id: user.id,
      ip_address: _ip,
      expires_at: expiresAt,
      last_login_at: currentDate,
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

  @Get('refresh')
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

  @Get('logoutAll')
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
