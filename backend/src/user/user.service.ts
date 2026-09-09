import { BadRequestException, Injectable } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import type { UserProfile } from '../common/interfaces/auth.interface.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOne(_id: string): Promise<UserProfile> {
    const user = await this.userRepository.findOneBy({ id: _id });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    return user;
  }

  update(
    _id: number | string,
    _updateProfileDto: UpdateProfileDto,
  ): Promise<UserProfile> {
    throw new Error('UserService.update is not implemented');
  }

  changePassword(
    _id: number | string,
    _changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    throw new Error('UserService.changePassword is not implemented');
  }

  remove(_id: number | string): Promise<void> {
    throw new Error('UserService.remove is not implemented');
  }
}
