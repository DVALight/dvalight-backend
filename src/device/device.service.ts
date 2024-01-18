import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async find(id: string) {
    const device = await this.prisma.devices.findUnique({
      where: { id: +id },
    });

    if (!device) throw new ConflictException('Device not found');

    return device;
  }

  async getDevice(id: string) {
    const device = await this.find(id);

    return device;
  }

  async toogleDevice(id: string) {
    const device = await this.find(id);

    return await this.prisma.devices.update({
      where: {
        id: (await device).id,
      },
      data: {
        state: !(await device).state,
      },
    });
  }
}
