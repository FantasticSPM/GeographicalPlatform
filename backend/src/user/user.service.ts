import { Injectable } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import type { UserProfile } from '../common/interfaces/auth.interface.js';

@Injectable()
export class UserService {
  findOne(_id: number | string): any {
    return {
      _id,
    };
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
