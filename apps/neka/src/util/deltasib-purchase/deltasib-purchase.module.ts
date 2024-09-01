import { Module } from '@nestjs/common';
import { DeltasibPurchaseService } from './deltasib-purchase.service';
import { DeltasibTokenModule } from '../deltasib-token/deltasib-token.module';

@Module({
  imports: [DeltasibTokenModule],
  providers: [DeltasibPurchaseService],
  exports: [DeltasibPurchaseService],
})
export class DeltasibPurchaseModule {}
