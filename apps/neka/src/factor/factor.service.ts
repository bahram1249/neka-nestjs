import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IUser } from '@rahino/auth/interface';
import { Factor } from '@rahino/database/models/neka/factor.entity';
import { DescribeCrmTerminalResultInterface } from '../util/crm-terminal/interface';
import { DeltasibServiceResultInterface } from '../util/deltasib-service/interface';
import { DeltasibUserResultInterface } from '../util/deltasib-user/interface';
import { FactorStatusEnum } from '../helper/enum';

@Injectable()
export class FactorService {
  constructor(
    @InjectModel(Factor) private readonly repository: typeof Factor,
  ) {}

  async generate(
    user: IUser,
    deltasibUser: DeltasibUserResultInterface,
    terminal: DescribeCrmTerminalResultInterface,
    service: DeltasibServiceResultInterface,
  ) {
    return await this.repository.create({
      crmUserId: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      terminalSim: terminal.terminalSim,
      deltasibUserId: deltasibUser.userId,
      price: BigInt(Number(service.price.split('.')[0]) * 10),
      deltasibServiceId: service.serviceId,
      deltasibServiceName: service.serviceName,
      deltasibServiceDescription: service.description,
      factorStatusId: FactorStatusEnum.unpaid,
    });
  }
}
