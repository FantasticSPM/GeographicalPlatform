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
import { Response as ApiResponseFactory } from '../common/interceptors/Response.js';
import { AccessTokenGuard } from '../auth/guards/access-token.guard.js';

@Controller('user')
@UseGuards(AccessTokenGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(
    @Req() request: AuthenticatedRequest,
  ): Promise<ApiResponse<UserProfile>> {
    const data = await this.userService.findOne(request.user.id);
    return ApiResponseFactory.success(data);
  }

  @Patch('me')
  async updateMe(
    @Req() request: AuthenticatedRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ApiResponse<UserProfile>> {
    const data = await this.userService.update(
      request.user.id,
      updateProfileDto,
    );
    return ApiResponseFactory.success(data, '用户资料更新成功');
  }

  @Patch('me/password')
  async changePassword(
    @Req() request: AuthenticatedRequest,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<ApiResponse<null>> {
    await this.userService.changePassword(request.user.id, changePasswordDto);
    return ApiResponseFactory.success(null, '密码修改成功');
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<UserProfile>> {
    const data = await this.userService.findOne(id);
    return ApiResponseFactory.success(data);
  }

  @Delete('me')
  async removeMe(
    @Req() request: AuthenticatedRequest,
  ): Promise<ApiResponse<null>> {
    await this.userService.remove(request.user.id);
    return ApiResponseFactory.success(null, '账号已注销');
  }
}
