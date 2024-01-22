import { Controller, Request, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DeviceService } from 'src/device/device.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly deviceService: DeviceService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('device')
  async getDevices(@Request() req) {
    return await this.deviceService.findAllOwnerDevices(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getProfile(@Request() req) {
    return await this.userService.findById(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return await this.userService.findById(id);
  }
}
