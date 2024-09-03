import { Module } from '@nestjs/common';
import { IranKishModule } from '@rahino/neka/util/irankish/irankish.module';
import { IranKishPaymentService } from './irankish-payment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from '@rahino/database/models/neka/payment.entity';

@Module({
  imports: [IranKishModule, SequelizeModule.forFeature([Payment])],
  providers: [IranKishPaymentService],
  exports: [IranKishPaymentService],
})
export class IranKishPaymentModule {}
