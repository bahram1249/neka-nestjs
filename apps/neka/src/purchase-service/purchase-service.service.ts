import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '@rahino/auth/interface';
import { TerminalService } from '../terminal/terminal.service';
import { DeltasibPurchaseService } from '../util/deltasib-purchase/deltasib-purchase.service';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly terminalService: TerminalService,
    private readonly deltasibPurchaseService: DeltasibPurchaseService,
  ) {}

  async getByTerminalSim(terminalSim: string, user: IUser) {
    const terminalRes = await this.terminalService.getAll(user);
    if (
      terminalRes.result.findIndex((x) => x.terminalSim == terminalSim) == -1
    ) {
      throw new NotFoundException('cannot find terminal sim');
    }
    return {
      result: await this.deltasibPurchaseService.getAll(terminalSim),
    };
  }
}
