import { Controller, Get, Param } from '@nestjs/common';
import { DeviceService } from './auth.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}
}
