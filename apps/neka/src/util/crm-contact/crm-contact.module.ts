import { Module } from '@nestjs/common';
import { CrmContactService } from './crm-contact.service';

@Module({
  providers: [CrmContactService],
  exports: [CrmContactService],
})
export class CrmContactModule {}
