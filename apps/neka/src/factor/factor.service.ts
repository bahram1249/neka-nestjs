import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IUser } from '@rahino/auth/interface';
import { Factor } from '@rahino/database/models/neka/factor.entity';
import { DescribeCrmTerminalResultInterface } from '../util/crm-terminal/interface';
import { DeltasibServiceResultInterface } from '../util/deltasib-service/interface';
import { DeltasibUserResultInterface } from '../util/deltasib-user/interface';
import { FactorStatusEnum } from '../helper/enum';
import { QueryOptionsBuilder } from '@rahino/query-filter/sequelize-query-builder';
import { Op } from 'sequelize';

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

  async finnalStatus(factorId: bigint) {
    let factor = await this.repository.findOne(
      new QueryOptionsBuilder()
        .filter({ id: factorId })
        .filter({
          factorStatusId: {
            [Op.ne]: FactorStatusEnum.paid,
          },
        })
        .build(),
    );
    if (!factor) {
      throw new BadRequestException("factor couldn't find");
    }
    factor.factorStatusId = FactorStatusEnum.paid;
    return await factor.save();
  }
}
