import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeviceService } from './device.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DeviceController],
  providers: [PrismaService, DeviceService, JwtService],
})
export class DeviceModule {}
