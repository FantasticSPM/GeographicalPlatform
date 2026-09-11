import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service.js';
import { AuthController } from './auth.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity.js';
import { User } from './entities/user.entity.js';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY_BACKEND } from '../constant/index.js';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenGuard } from './guards/access-token.guard.js';
import { AccessTokenStrategy } from './strategies/access-token.strategy.js';
import { UserService } from './services/user.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: SECRET_KEY_BACKEND,
      signOptions: {
        expiresIn: '15d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, AccessTokenStrategy, AccessTokenGuard],
  exports: [AccessTokenGuard, PassportModule],
})
export class AuthModule {}
