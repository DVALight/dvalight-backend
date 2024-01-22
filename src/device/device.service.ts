import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeviceDto, UpdateDeviceColorDto } from './dto/device.dto';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async find(user: any, id: string) {
    const device = await this.prisma.device.findUnique({
      where: { id: parseInt(id) },
    });

    if (!device) {
      throw new NotFoundException();
    }

    if (device.ownerId !== user.id) {
      throw new ForbiddenException();
    }

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

  async getDevice(req: any, id: string) {
    const device = await this.find(req.user, id);

    return device;
  }

  async putDevice(user: any, id: string, dto: CreateDeviceDto) {
    const device = await this.find(user, id);

    return await this.prisma.device.update({
      where: { id: device.id },
      data: { state: dto.state, color: dto.color },
    });
  }

  async toggleDevice(user: any, id: string) {
    const device = await this.find(user, id);

    return await this.prisma.device.update({
      where: { id: device.id },
      data: { state: !device.state },
    });
  }

  async updateColor(user: any, id: string, dto: UpdateDeviceColorDto) {
    const device = await this.find(user, id);

    return await this.prisma.device.update({
      where: { id: device.id },
      data: { color: dto.color },
    });
  }
}
