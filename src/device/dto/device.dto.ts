import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsBoolean()
  state: boolean;

  @IsNumber()
  color: number;
}

export class UpdateDeviceDto {
  @IsString()
  id: string;

  @IsNumber()
  color: number;
}
