import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
import { SECRET_KEY } from '../../constant/index.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../entities/auth.entity.js';

type AccessTokenPayload = {
  userId: number | string;
  sessionId: string;
  username?: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.access_token,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: SECRET_KEY,
    });
  }

  async validate(payload: AccessTokenPayload) {
    if (!payload.sessionId) {
      throw new UnauthorizedException('登录会话无效');
    }

    const session = await this.authRepository.findOne({
      where: {
        id: payload.sessionId,
      },
    });

    const isExpired =
      !session?.expires_at || session.expires_at.getTime() <= Date.now();
    const isRevoked = session?.revoked_at != null;
    const belongsToUser =
      session && String(session.user_id) === String(payload.userId);

    if (!session || isExpired || isRevoked || !belongsToUser) {
      throw new UnauthorizedException('登录已失效，请重新登录');
    }

    return {
      id: payload.userId,
      username: payload.username ?? '',
      sessionId: payload.sessionId,
    };
  }
}
