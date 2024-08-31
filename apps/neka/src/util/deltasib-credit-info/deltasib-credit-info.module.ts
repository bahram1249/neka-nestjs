import { Module } from '@nestjs/common';
import { DeltasibCreditInfoService } from './deltasib-credit-info.service';
import { DeltasibTokenModule } from '../deltasib-token/deltasib-token.module';

@Module({
  imports: [DeltasibTokenModule],
  providers: [DeltasibCreditInfoService],
  exports: [DeltasibCreditInfoService],
})
export class DeltasibCreditInfoModule {}
