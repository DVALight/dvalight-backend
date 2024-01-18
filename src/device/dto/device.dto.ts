import { IsNumber, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  id: string;

  @IsNumber()
  color: number;
}
