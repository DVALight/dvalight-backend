import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DeviceService } from 'src/device/device.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, DeviceService, PrismaService, JwtService],
})
export class UserModule {}
