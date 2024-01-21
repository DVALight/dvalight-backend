import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/device.dto';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(id: string) {
    let device = await this.prisma.devices.findUnique({
      where: { id: parseInt(id) },
    });

    if (!device) {
      device = await this.prisma.devices.create({
        data: { id: +id, state: false },
      });
    }

    return device;
  }

  async getDevice(id: string) {
    const device = await this.findOrCreate(id);

    return device;
  }

  async putDevice(id: string, dto: CreateDeviceDto) {
    const device = await this.findOrCreate(id);

    return await this.prisma.devices.update({
      where: { id: device.id },
      data: { state: dto.state, color: dto.color },
    });
  }

  async toggleDevice(id: string) {
    const device = await this.findOrCreate(id);

    return await this.prisma.devices.update({
      where: { id: device.id },
      data: { state: !device.state },
    });
  }

  async changeColor(dto: UpdateDeviceDto) {
    const device = await this.findOrCreate(dto.id);

    return await this.prisma.devices.update({
      where: { id: device.id },
      data: { color: dto.color },
    });
  }
}
