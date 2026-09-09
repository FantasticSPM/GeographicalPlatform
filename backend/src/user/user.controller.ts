import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import type { ApiResponse } from '../common/interfaces/api-response.interface.js';
import type {
  AuthenticatedRequest,
  UserProfile,
} from '../common/interfaces/auth.interface.js';
import { AccessTokenGuard } from '../auth/guards/access-token.guard.js';

@Controller('user')
@UseGuards(AccessTokenGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@Req() request: AuthenticatedRequest) {
    const data = await this.userService.findOne(String(request.user.id));
    delete data.password;
    return data;
  }

  @Patch('me')
  async updateMe(
    @Req() request: AuthenticatedRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<any> {
    const data = await this.userService.update(
      request.user.id,
      updateProfileDto,
    );
    return data;
  }

  @Patch('me/password')
  async changePassword(
    @Req() request: AuthenticatedRequest,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    await this.userService.changePassword(request.user.id, changePasswordDto);
    return null;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const data = await this.userService.findOne(id);
    return data;
  }

  @Delete('me')
  async removeMe(@Req() request: AuthenticatedRequest): Promise<any> {
    await this.userService.remove(request.user.id);
    return null;
  }
}
