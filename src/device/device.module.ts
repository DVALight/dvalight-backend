import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DeviceController],
  providers: [PrismaService],
})
export class DeviceModule {}
