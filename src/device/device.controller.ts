import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
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
  @Patch('toggle/:id')
  async toogleDevice(@Param('id') id: string) {
    return await this.deviceService.toggleDevice(id);
  }

  @UseGuards(JwtGuard)
  @Patch('color')
  async changeColor(@Body() dto: CreateDeviceDto) {
    return await this.deviceService.changeColor(dto);
  }
}
