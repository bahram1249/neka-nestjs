import { Module } from '@nestjs/common';
import { FactorService } from './factor.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Factor } from '@rahino/database/models/neka/factor.entity';
import { DeltasibPurchaseModule } from '../util/deltasib-purchase/deltasib-purchase.module';
import { FactorController } from './factor.controller';
import { CrmFactorModule } from '../util/crm-factor/crm-factor.module';

@Module({
  imports: [
    DeltasibPurchaseModule,
    CrmFactorModule,
    SequelizeModule.forFeature([Factor]),
  ],
  controllers: [FactorController],
  providers: [FactorService],
  exports: [FactorService],
})
export class FactorModule {}
