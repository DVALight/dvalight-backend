import { IsBoolean, IsNumber } from 'class-validator';

export class CreateDeviceDto {
  @IsBoolean()
  state: boolean;

  @IsNumber()
  color: number;
}

export class UpdateDeviceStateDto {
  @IsBoolean()
  state: boolean;
}

export class UpdateDeviceColorDto {
  @IsNumber()
  color: number;
}
