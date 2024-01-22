import {
  Body,
  Controller,
  Request,
  Param,
  Get,
  Put,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  CreateDeviceDto,
  UpdateDeviceColorDto,
  UpdateDeviceStateDto,
} from './dto/device.dto';
import { DeviceService } from './device.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createDevice(@Request() req, @Body() dto: CreateDeviceDto) {
    return await this.deviceService.createDevice(req.user, dto);
  }

  @Get(':id')
  async getDevice(@Param('id') id: string) {
    return await this.deviceService.getDevice(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async putDevice(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: CreateDeviceDto,
  ) {
    return await this.deviceService.putDevice(req.user, id, dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/toggle')
  async toggleDevice(@Request() req, @Param('id') id: string) {
    return await this.deviceService.toggleDevice(req.user, id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/state')
  async updateState(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateDeviceStateDto,
  ) {
    return await this.deviceService.updateState(req.user, id, dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/color')
  async updateColor(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateDeviceColorDto,
  ) {
    return await this.deviceService.updateColor(req.user, id, dto);
  }
}
