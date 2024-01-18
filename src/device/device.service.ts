import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(id: string) {
    let device = await this.prisma.devices.findUnique({
      where: { id: +id },
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

  async toogleDevice(id: string) {
    const device = await this.findOrCreate(id);

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
