import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { LogoutDto } from './dto/logout.dto.js';
import type { UserProfile } from '../common/interfaces/auth.interface.js';
import {
  generateRandomNickname,
  define,
  generateUniqueId,
} from '../common/tools/index.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity.js';
import { Auth } from './entities/auth.entity.js';
import CryptoJS from 'crypto-js';
import { JwtService } from '@nestjs/jwt';
import { SECRET_KEY, SECRET_KEY_BACKEND } from '../constant/index.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,

    private readonly jwtService: JwtService,
  ) {}
  async register(_createAuthDto: CreateAuthDto): Promise<UserProfile> {
    // 判断是否有用户名
    if (!define(_createAuthDto.username)) {
      throw new BadRequestException('用户名不能为空!');
    }

    const usernameReg = /^[A-Za-z][A-Za-z0-9_]{3,9}$/;
    if (!usernameReg.test(_createAuthDto.username)) {
      throw new BadRequestException(
        '账号必须为 4～10 位，只能包含英文字母、数字和下划线，且必须以英文字母开头。',
      );
    }

    // 判断是否有密码
    if (!define(_createAuthDto.password)) {
      throw new BadRequestException('密码不能为空!');
    }

    const passwordReg = /^(?=.*[A-Za-z])[A-Za-z0-9_]{8,16}$/;
    if (!passwordReg.test(_createAuthDto.password)) {
      throw new BadRequestException(
        '密码需要包含 8～16 位的字母、数字、下划线，并且必须至少包含一个字母！',
      );
    }

    // 判断是否有昵称
    if (!define(_createAuthDto.nick_name)) {
      _createAuthDto.nick_name = generateRandomNickname();
    }

    // 判断用户名是否存在
    const user = await this.userRepository.findOne({
      where: {
        username: _createAuthDto.username,
      },
    });

    if (user) {
      throw new BadRequestException('用户名已存在!');
    }

    const currentTime = new Date();

    // 创建用户
    const newUser = this.userRepository.create({
      ..._createAuthDto,
      password: CryptoJS.AES.encrypt(
        _createAuthDto.password,
        SECRET_KEY_BACKEND,
      ).toString(),
      created_at: currentTime,
      updated_at: currentTime,
    });
    await this.userRepository.save(newUser);

    const resultInfo: UserProfile = { ...newUser };
    delete resultInfo.password;
    return resultInfo;
  }

  async login(_loginDto: LoginDto, ip: string): Promise<UserProfile> {
    if (!define(_loginDto.username)) {
      throw new UnauthorizedException('用户名不能为空!');
    }

    if (!define(_loginDto.password)) {
      throw new UnauthorizedException('密码不能为空!');
    }

    const user = await this.userRepository.findOne({
      where: {
        username: _loginDto.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在!');
    }

    const password_hash = CryptoJS.AES.decrypt(
      user.password,
      SECRET_KEY_BACKEND,
    ).toString(CryptoJS.enc.Utf8);

    if (password_hash !== _loginDto.password) {
      throw new UnauthorizedException('密码错误!');
    }

    // 单会话策略：创建新会话前，撤销该用户仍然有效的旧会话。
    const revokedAt = new Date();
    await this.authRepository
      .createQueryBuilder()
      .update(Auth)
      .set({
        revoked_at: revokedAt,
        updated_at: revokedAt,
      })
      .where('user_id = :userId', { userId: +user.id })
      .andWhere('revoked_at IS NULL')
      .andWhere('expires_at > :now', { now: revokedAt })
      .execute();

    // 创建会话
    const sessionId = generateUniqueId();

    const _ip = ip?.replace(/^::ffff:/, '').replace(/^::1$/, '127.0.0.1');

    const refresh_token = await this.jwtService.signAsync({
      sessionId,
    });

    const created_at = new Date();
    const updated_at = created_at;
    const expires_at = new Date(+created_at + 15 * 60 * 1000);

    const access_token = await this.jwtService.signAsync(
      {
        userId: user.id,
        sessionId,
      },
      {
        secret: SECRET_KEY,
        expiresIn: '15min',
      },
    );

    const newSession = this.authRepository.create({
      id: sessionId,
      user_id: +user.id,
      ip_address: _ip,
      refresh_token,
      created_at,
      expires_at,
      updated_at,
    });

    await this.authRepository.save(newSession);

    // 更新用户表的登录时间
    await this.userRepository.update(+user.id, {
      last_login_at: new Date(),
    });

    const data: UserProfile = {
      ...user,
      access_token,
      refresh_token,
    };

    return data;
  }

  refresh(_refreshTokenDto: RefreshTokenDto): Promise<any> {
    throw new Error('AuthService.refresh is not implemented');
  }

  async logout(req): Promise<any> {
    const sessionId = req.user?.sessionId;
    const revokedAt = new Date();
    const session = await this.authRepository.update(sessionId, {
      revoked_at: revokedAt,
      updated_at: revokedAt,
    });
    return;
  }

  me(_userId: number | string): Promise<UserProfile> {
    const data: UserProfile = {
      id: 1,
      username: 'test',
      nick_name: '',
      avatar: '',
      lastLoginAt: '',
      createdAt: '',
    };

    return Promise.resolve(data);
  }
}
