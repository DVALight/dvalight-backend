import {
  Body,
  Controller,
  Param,
  Get,
  Put,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/device.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get(':id')
  async getDevice(@Param('id') id: string) {
    return await this.deviceService.getDevice(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async putDevice(@Param('id') id: string, @Body() dto: CreateDeviceDto) {
    return await this.deviceService.putDevice(id, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('toggle/:id')
  async toggleDevice(@Param('id') id: string) {
    return await this.deviceService.toggleDevice(id);
  }

  @UseGuards(JwtGuard)
  @Patch('color')
  async changeColor(@Body() dto: UpdateDeviceDto) {
    return await this.deviceService.changeColor(dto);
  }
}
