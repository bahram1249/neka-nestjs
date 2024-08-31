import { Module } from '@nestjs/common';
import { CrmTerminalService } from './crm-terminal.service';

@Module({
  providers: [CrmTerminalService],
  exports: [CrmTerminalService],
})
export class CrmTerminalModule {}
