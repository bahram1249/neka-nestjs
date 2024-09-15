import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Factor } from '@rahino/database/models/neka/factor.entity';
import { CrmFactorModule } from '../util/crm-factor/crm-factor.module';
import { GenerateCrmFactorController } from './crm-factor-test.controller';
import { CrmFactorTestService } from './crm-factor-test.service';

@Module({
  imports: [SequelizeModule.forFeature([Factor]), CrmFactorModule],
  controllers: [GenerateCrmFactorController],
  providers: [CrmFactorTestService],
})
export class CrmFactorTestModule {}
