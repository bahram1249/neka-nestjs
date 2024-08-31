import { Module } from '@nestjs/common';
import { CrmContactService } from './crm-contact.service';
import { CrmSessionModule } from '../crm-session/crm-session.module';

@Module({
  imports: [CrmSessionModule],
  providers: [CrmContactService],
  exports: [CrmContactService],
})
export class CrmContactModule {}
