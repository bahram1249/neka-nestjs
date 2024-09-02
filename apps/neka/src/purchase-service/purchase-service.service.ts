import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '@rahino/auth/interface';
import { TerminalService } from '../terminal/terminal.service';
import { DeltasibPurchaseService } from '../util/deltasib-purchase/deltasib-purchase.service';
import { PurchaseServiceDto } from './dto';
import { DeltasibUserService } from '../util/deltasib-user/deltasib-user.service';
import { DeltasibServiceService } from '../util/deltasib-service/deltasib-service.service';
import { FactorService } from '../factor/factor.service';
import { IranKishPaymentService } from '../payment/irankish-payment/irankish-payment.service';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly terminalService: TerminalService,
    private readonly deltasibPurchaseService: DeltasibPurchaseService,
    private readonly deltasibUserService: DeltasibUserService,
    private readonly deltasibServiceService: DeltasibServiceService,
    private readonly factorService: FactorService,
    private readonly irankishPaymentService: IranKishPaymentService,
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

  async buy(user: IUser, dto: PurchaseServiceDto) {
    // find terminal in crm
    const terminalRes = await this.terminalService.getAll(user);
    const terminal = terminalRes.result.find(
      (x) => x.terminalSim == dto.terminalSim,
    );
    if (!terminal) {
      throw new NotFoundException('cannot find terminal sim');
    }

    // find user in deltasib
    const deltasibUser = await this.deltasibUserService.getUserByTerminalSim(
      dto.terminalSim,
    );
    if (!deltasibUser) {
      throw new InternalServerErrorException("deltasib user couldn't find!");
    }

    // find service in deltasib
    const services = await this.deltasibServiceService.getAll();
    const service = await services.find((x) => x.serviceId == dto.serviceId);
    if (!service) {
      throw new BadRequestException("the service couldn't find!");
    }

    // generate factor
    const factor = await this.factorService.generate(
      user,
      deltasibUser,
      terminal,
      service,
    );

    await this.irankishPaymentService.generatePaymentFromFactor(factor);
    // create record
    return {
      result: 'ok',
    };
  }
}
