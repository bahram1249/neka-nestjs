import { Module } from '@nestjs/common';
import { DeltasibTokenService } from './deltasib-token.service';

@Module({
  providers: [DeltasibTokenService],
  exports: [DeltasibTokenService],
})
export class DeltasibTokenModule {}
