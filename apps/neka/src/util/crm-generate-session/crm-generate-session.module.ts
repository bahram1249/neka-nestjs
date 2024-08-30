import { Module } from '@nestjs/common';
import { CrmGenerateSessionService } from './crm-generate-session.service';

@Module({
  providers: [CrmGenerateSessionService],
  exports: [CrmGenerateSessionService],
})
export class CrmGenerateSessionModule {}
