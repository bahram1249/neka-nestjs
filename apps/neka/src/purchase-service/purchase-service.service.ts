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
    const terminal = terminalRes.result.find(
      (x) => x.terminalSim == terminalSim,
    );
    if (!terminal) {
      throw new NotFoundException('cannot find terminal sim');
    }
    return {
      result: await this.deltasibPurchaseService.getAll(terminal.terminalSim),
    };
  }
}
