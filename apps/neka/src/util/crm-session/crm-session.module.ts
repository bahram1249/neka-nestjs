import { Module } from '@nestjs/common';
import { CrmSessionService } from './crm-session.service';
import { CrmTokenModule } from '../crm-token/crm-token.module';

@Module({
  imports: [CrmTokenModule],
  providers: [CrmSessionService],
  exports: [CrmSessionService],
})
export class CrmSessionModule {}
