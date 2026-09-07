import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity.js';
import { User } from '../user/entities/user.entity.js';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY_BACKEND } from '../constant/index.js';
@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, User]),
    JwtModule.register({
      secret: SECRET_KEY_BACKEND,
      signOptions: {
        expiresIn: '15d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
