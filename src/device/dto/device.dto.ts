import { IsNumber } from 'class-validator';

export class DVARequestDTO {
  @IsNumber()
  deviceId: number;
}
