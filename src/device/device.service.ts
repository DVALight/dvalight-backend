import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeviceDto, UpdateDeviceDto } from './dto/device.dto';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async find(id: string) {
    const device = await this.prisma.device.findUnique({
      where: { id: parseInt(id) },
    });

    return device;
  }

  async createDevice(user: any, dto: CreateDeviceDto) {
    console.log(user);
    return await this.prisma.device.create({
      data: {
        state: dto.state,
        color: dto.color,
        owner: { connect: { id: user.id } },
      },
    });
  }

  async getDevice(id: string) {
    const device = await this.find(id);

    return device;
  }

  async putDevice(id: string, dto: CreateDeviceDto) {
    const device = await this.find(id);

    return await this.prisma.device.update({
      where: { id: device.id },
      data: { state: dto.state, color: dto.color },
    });
  }

  async toggleDevice(id: string) {
    const device = await this.find(id);

    return await this.prisma.device.update({
      where: { id: device.id },
      data: { state: !device.state },
    });
  }

  async changeColor(dto: UpdateDeviceDto) {
    const device = await this.find(dto.id);

    return await this.prisma.device.update({
      where: { id: device.id },
      data: { color: dto.color },
    });
  }
}
