import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/device.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get(':id')
  async getDevice(@Param('id') id: string) {
    return await this.deviceService.getDevice(id);
  }

  @UseGuards(JwtGuard)
  @Post('toogle/:id')
  async toogleDevice(@Param('id') id: string) {
    return await this.deviceService.toogleDevice(id);
  }

  @UseGuards(JwtGuard)
  @Post('color')
  async changeColor(@Body() dto: CreateDeviceDto) {
    return await this.deviceService.changeColor(dto);
  }
}
