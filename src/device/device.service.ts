import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async getDevice(id: string) {
    const device = await this.prisma.devices.findUnique({
      where: { id: +id },
    });

    if (!device) throw new ConflictException('Device not found');

    return device;
  }
}
