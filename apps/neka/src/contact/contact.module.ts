import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { CrmContactModule } from '../util/crm-contact/crm-contact.module';

@Module({
  imports: [CrmContactModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
