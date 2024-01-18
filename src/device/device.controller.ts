import { Controller, Get, Param, Post } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get(':id')
  async getDevice(@Param('id') id: string) {
    return await this.deviceService.getDevice(id);
  }

  @Post(':id')
  async toogleDevice(@Param('id') id: string) {
    return await this.deviceService.toogleDevice(id);
  }
}
