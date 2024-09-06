import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IUser } from '@rahino/auth/interface';
import { Factor } from '@rahino/database/models/neka/factor.entity';
import { DescribeCrmTerminalResultInterface } from '../util/crm-terminal/interface';
import { DeltasibServiceResultInterface } from '../util/deltasib-service/interface';
import { DeltasibUserResultInterface } from '../util/deltasib-user/interface';
import { FactorStatusEnum } from '../helper/enum';
import { QueryOptionsBuilder } from '@rahino/query-filter/sequelize-query-builder';
import { Op, Transaction } from 'sequelize';
import { DeltasibPurchaseService } from '../util/deltasib-purchase/deltasib-purchase.service';
import * as _ from 'lodash';

@Injectable()
export class FactorService {
  constructor(
    @InjectModel(Factor) private readonly repository: typeof Factor,
    private readonly deltasibPurchaseService: DeltasibPurchaseService,
  ) {}

  async generate(
    user: IUser,
    deltasibUser: DeltasibUserResultInterface,
    terminal: DescribeCrmTerminalResultInterface,
    service: DeltasibServiceResultInterface,
    transaction?: Transaction,
  ) {
    return await this.repository.create(
      {
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
      },
      {
        transaction: transaction,
      },
    );
  }

  async finnalStatus(factorId: bigint, transaction?: Transaction) {
    let factor = await this.repository.findOne(
      new QueryOptionsBuilder()
        .filter({ id: factorId })
        .filter({
          factorStatusId: {
            [Op.ne]: FactorStatusEnum.paid,
          },
        })
        .transaction(transaction)
        .build(),
    );
    if (!factor) {
      throw new BadRequestException("factor couldn't find");
    }

    factor.factorStatusId = FactorStatusEnum.paid;

    await this.deltasibPurchaseService.add({
      Action: 'add',
      Service_Id: factor.deltasibServiceId,
      User_Id: factor.deltasibUserId,
      PayPlan: 'PostPaid',
    });

    const updated = await Factor.update(_.omit(factor, ['id']), {
      transaction: transaction,
      returning: true,
      where: {
        id: factor.id,
      },
    });
    return updated[1][0];
  }
}
