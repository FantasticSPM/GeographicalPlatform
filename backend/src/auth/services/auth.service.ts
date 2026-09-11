import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../entities/auth.entity.js';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { UserService } from './user.service.js';
import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_ACCESS_TOKEN_SECRET_KEY,
} from '../../constant/index.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async create(createDto: any) {
    const session = await this.authRepository.save({ ...createDto });
    return session;
  }

  async updateRefreshTokenHash(_refreshTokenDto: RefreshTokenDto) {
    const { sessionId, refreshTokenHash } = _refreshTokenDto;
    const result = await this.authRepository.update(sessionId, {
      refresh_token_hash: refreshTokenHash,
    });
    if (!result) return false;
    return result?.affected ? result?.affected > 0 : false;
  }

  findById(id: string) {
    return this.authRepository.findOneBy({ id });
  }

  async generateTokens(userId, sessionId) {
    const accessTokenPayload = {
      userId: userId,
      sessionId: sessionId,
    };

    const refreshTokenPayload = {
      userId: userId,
      sessionId: sessionId,
    };

    const access_token = await this.jwtService.signAsync(accessTokenPayload, {
      secret: ACCESS_TOKEN_SECRET_KEY,
      expiresIn: '15min',
    });
    const refresh_token = await this.jwtService.signAsync(refreshTokenPayload, {
      secret: REFRESH_ACCESS_TOKEN_SECRET_KEY,
      expiresIn: '7d',
    });
    return { access_token, refresh_token };
  }

  hashRefreshToken(refreshToken: string) {
    return createHash('sha256').update(refreshToken).digest('hex');
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    const { user, session } = await this.verifyRefreshToken(refreshToken);

    const tokens = await this.generateTokens(user.id, session.id);

    const new_refreshTokenHash = this.hashRefreshToken(tokens.refresh_token);
    await this.updateRefreshTokenHash({
      sessionId: session.id,
      refreshTokenHash: new_refreshTokenHash,
    });
    return tokens;
  }

  async verifyRefreshToken(refreshToken: string): Promise<any> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token不存在');
    }

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch (e) {
      throw new UnauthorizedException('Refresh token无效或者已过期');
    }
    const session = await this.findById(payload.sessionId);

    if (!session) {
      throw new UnauthorizedException('Session 不存在');
    }

    if (session.user_id != payload.userId) {
      throw new UnauthorizedException('用户不匹配');
    }

    if (session.revoked_at) {
      throw new UnauthorizedException('Session 已被注销');
    }

    if (session.expires_at.getTime() <= Date.now()) {
      throw new UnauthorizedException('Session 已过期');
    }
    const incomingTokenHash = this.hashRefreshToken(refreshToken);
    if (incomingTokenHash !== session.refresh_token_hash) {
      throw new UnauthorizedException('Refresh token无效或者已过期');
    }

    const user = await this.userService.findOneById(session.user_id);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    return {
      user,
      session,
    };
  }

  async logout(refreshToken: string): Promise<any> {
    const { session } = await this.verifyRefreshToken(refreshToken);

    await this.authRepository.update(session.id, {
      revoked_at: new Date(),
    });

    return;
  }

  async logoutAll(refreshToken: string): Promise<any> {
    const { session, user } = await this.verifyRefreshToken(refreshToken);
    const revoked_at = new Date();

    await this.authRepository
      .createQueryBuilder()
      .update(Auth)
      .set({
        revoked_at,
      })
      .where('user_id = :userId', { userId: user.id })
      .andWhere('revoked_at IS NULL')
      .andWhere('expires_at > :now', { now: revoked_at })
      .execute();
    // await this.authRepository.updateAll(
    //   {
    //     revoked_at: new Date(),
    //   },
    //   {
    //     id: session.user_id,
    //   },
    // );
  }
}
