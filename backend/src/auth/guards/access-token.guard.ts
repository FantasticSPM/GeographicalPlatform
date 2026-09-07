import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 校验 access_token，并在校验成功后把用户信息放到 request.user。
 */
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {}
