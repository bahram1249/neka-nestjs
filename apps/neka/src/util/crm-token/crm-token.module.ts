import { Module } from '@nestjs/common';
import { CrmTokenService } from './crm-token.service';

@Module({
  providers: [CrmTokenService],
  exports: [CrmTokenService],
})
export class CrmTokenModule {}
