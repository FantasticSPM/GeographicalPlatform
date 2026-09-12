import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service.ts';
import { AuthController } from './auth.controller.ts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity.ts';
import { User } from './entities/user.entity.ts';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY_BACKEND } from '../constant/index.ts';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenGuard } from './guards/access-token.guard.ts';
import { AccessTokenStrategy } from './strategies/access-token.strategy.ts';
import { UserService } from './services/user.service.ts';
import { UtilsModule } from '../utils/utils.module.ts';

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
    UtilsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, AccessTokenStrategy, AccessTokenGuard],
  exports: [AccessTokenGuard, PassportModule],
})
export class AuthModule {}
