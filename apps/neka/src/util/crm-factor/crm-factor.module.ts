import { Module } from '@nestjs/common';
import { CrmFactorService } from './crm-factor.service';
import { CrmSessionModule } from '../crm-session/crm-session.module';

@Module({
  imports: [CrmSessionModule],
  providers: [CrmFactorService],
  exports: [CrmFactorService],
})
export class CrmFactorModule {}
