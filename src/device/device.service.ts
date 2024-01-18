import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DVARequestDTO } from './dto/device.dto';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async request(dto: DVARequestDTO) {
    const device = await this.prisma.devices.findUnique({
      where: { id: dto.deviceId },
    });

    return device;
  }
}
