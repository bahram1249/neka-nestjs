import { IsOptional, IsString } from 'class-validator';

export class VerifyDto {
  @IsString()
  token: string;
  @IsString()
  acceptorId: string;
  @IsString()
  @IsOptional()
  responseCode: string;
  @IsString()
  @IsOptional()
  requestId: string;
  @IsString()
  @IsOptional()
  retrievalReferenceNumber: string;
  @IsString()
  @IsOptional()
  amount: string;
  @IsString()
  @IsOptional()
  maskedPan: string;
  @IsString()
  @IsOptional()
  systemTraceAuditNumber: string;
}
