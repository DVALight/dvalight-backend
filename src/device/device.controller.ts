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
import { DeviceService } from './device.service';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/device.dto';
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
  async getDevice(@Request() req, @Param('id') id: string) {
    return await this.deviceService.getDevice(req, id);
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
  @Patch('toggle/:id')
  async toggleDevice(@Request() req, @Param('id') id: string) {
    return await this.deviceService.toggleDevice(req.user, id);
  }

  @UseGuards(JwtGuard)
  @Patch('color')
  async changeColor(@Request() req, @Body() dto: UpdateDeviceDto) {
    return await this.deviceService.changeColor(req.user, dto);
  }
}
