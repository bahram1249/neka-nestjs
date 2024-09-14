import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase-service.service';
import { PurchaseServiceController } from './purchase-service.controller';
import { TerminalModule } from '../terminal/terminal.module';
import { DeltasibPurchaseModule } from '../util/deltasib-purchase/deltasib-purchase.module';
import { DeltasibUserModule } from '../util/deltasib-user/deltasib-user.module';
import { DeltasibServiceModule } from '../util/deltasib-service/deltasib-service.module';
import { FactorModule } from '../factor/factor.module';
import { IranKishPaymentModule } from '../payment/irankish-payment/irankish-payment.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CrmProductModule } from '../util/crm-product/crm-product.module';

@Module({
  imports: [
    SequelizeModule,
    DeltasibPurchaseModule,
    DeltasibUserModule,
    DeltasibServiceModule,
    TerminalModule,
    FactorModule,
    CrmProductModule,
    IranKishPaymentModule,
  ],
  controllers: [PurchaseServiceController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseServiceModule {}
