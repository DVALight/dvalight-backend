import { Controller, Get, Param } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DVARequestDTO } from './dto/device.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get(':id')
  async request(@Param('id') id: number) {
    return await this.deviceService.request(id);
  }
}
