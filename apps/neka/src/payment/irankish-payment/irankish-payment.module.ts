import { Module } from '@nestjs/common';
import { IranKishModule } from '@rahino/neka/util/irankish/irankish.module';
import { IranKishPaymentService } from './irankish-payment.service';

@Module({
  imports: [IranKishModule],
  providers: [IranKishPaymentService],
  exports: [IranKishPaymentService],
})
export class IranKishPaymentModule {}
