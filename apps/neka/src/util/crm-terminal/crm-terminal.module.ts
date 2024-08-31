import { Module } from '@nestjs/common';
import { CrmTerminalService } from './crm-terminal.service';
import { CrmSessionModule } from '../crm-session/crm-session.module';

@Module({
  imports: [CrmSessionModule],
  providers: [CrmTerminalService],
  exports: [CrmTerminalService],
})
export class CrmTerminalModule {}
