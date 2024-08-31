import { Module } from '@nestjs/common';
import { CreditInfoService } from './credit-info.service';
import { CreditInfoController } from './credit-info.controller';
import { DeltasibCreditInfoModule } from '../util/deltasib-credit-info/deltasib-credit-info.module';
import { TerminalModule } from '../terminal/terminal.module';

@Module({
  imports: [DeltasibCreditInfoModule, TerminalModule],
  controllers: [CreditInfoController],
  providers: [CreditInfoService],
  exports: [CreditInfoService],
})
export class CreditInfoModule {}
