import { Module } from '@nestjs/common';
import { CrmSessionModule } from '../crm-session/crm-session.module';
import { CrmProductService } from './crm-product.service';

@Module({
  imports: [CrmSessionModule],
  providers: [CrmProductService],
  exports: [CrmProductService],
})
export class CrmProductModule {}
