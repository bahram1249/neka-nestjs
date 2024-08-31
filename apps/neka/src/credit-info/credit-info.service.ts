import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '@rahino/auth/interface';
import { TerminalService } from '../terminal/terminal.service';
import { DeltasibCreditInfoService } from '../util/deltasib-credit-info/deltasib-credit-info.service';

@Injectable()
export class CreditInfoService {
  constructor(
    private readonly terminalService: TerminalService,
    private readonly deltasibCreditInfoService: DeltasibCreditInfoService,
  ) {}

  async getByTerminalSim(terminalSim: string, user: IUser) {
    const terminalRes = await this.terminalService.getAll(user);
    if (
      terminalRes.result.findIndex((x) => x.terminalSim == terminalSim) == -1
    ) {
      throw new NotFoundException('cannot find terminal sim');
    }
    return {
      result: await this.deltasibCreditInfoService.findCreditInfo(terminalSim),
    };
  }
}
