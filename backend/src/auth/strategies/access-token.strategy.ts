import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
import { SECRET_KEY } from '../../constant/index.js';

type AccessTokenPayload = {
  userId: number | string;
  username?: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.access_token,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: SECRET_KEY,
    });
  }

  validate(payload: AccessTokenPayload) {
    return {
      id: payload.userId,
      username: payload.username ?? '',
    };
  }
}
