import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeviceService } from './device.service';

@Module({
  controllers: [DeviceController],
  providers: [PrismaService, DeviceService],
})
export class DeviceModule {}
