import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase-service.service';
import { PurchaseServiceController } from './purchase-service.controller';
import { TerminalModule } from '../terminal/terminal.module';
import { DeltasibPurchaseModule } from '../util/deltasib-purchase/deltasib-purchase.module';

@Module({
  imports: [DeltasibPurchaseModule, TerminalModule],
  controllers: [PurchaseServiceController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseServiceModule {}
