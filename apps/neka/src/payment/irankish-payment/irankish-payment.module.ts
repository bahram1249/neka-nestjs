import { Module } from '@nestjs/common';
import { IranKishModule } from '@rahino/neka/util/irankish/irankish.module';
import { IranKishPaymentService } from './irankish-payment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from '@rahino/database/models/neka/payment.entity';
import { FactorModule } from '@rahino/neka/factor/factor.module';
import { IranKishPaymentController } from './Irankish-payment.controller';

@Module({
  imports: [
    IranKishModule,
    FactorModule,
    SequelizeModule.forFeature([Payment]),
    SequelizeModule,
  ],
  controllers: [IranKishPaymentController],
  providers: [IranKishPaymentService],
  exports: [IranKishPaymentService],
})
export class IranKishPaymentModule {}
