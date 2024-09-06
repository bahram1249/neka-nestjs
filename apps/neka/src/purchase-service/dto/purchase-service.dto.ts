import { IsString } from 'class-validator';

export class PurchaseServiceDto {
  @IsString()
  serviceId: string;
  @IsString()
  terminalSim: string;
}
