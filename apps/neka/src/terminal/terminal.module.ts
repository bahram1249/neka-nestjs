import { Module } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { TerminalController } from './terminal.controller';
import { CrmTerminalModule } from '../util/crm-terminal/crm-terminal.module';

@Module({
  imports: [CrmTerminalModule],
  controllers: [TerminalController],
  providers: [TerminalService],
  exports: [TerminalService],
})
export class TerminalModule {}
