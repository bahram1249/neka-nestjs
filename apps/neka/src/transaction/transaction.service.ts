import { Injectable, NotFoundException } from '@nestjs/common';
import { ListFilter } from '@rahino/query-filter';
import { IUser } from '@rahino/auth/interface';
import { QueryOptionsBuilder } from '@rahino/query-filter/sequelize-query-builder';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from '@rahino/database/models/neka/payment.entity';
import { PaymentStatus } from '@rahino/database/models/neka/payment-status.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Payment) private readonly repository: typeof Payment,
  ) {}

  async getAll(user: IUser, filter: ListFilter) {
    let queryBuilder = new QueryOptionsBuilder().filter({ crmUserId: user.id });
    const count = await this.repository.count(queryBuilder.build());
    queryBuilder = queryBuilder
      .attributes([
        'id',
        'crmUserId',
        'firstname',
        'lastname',
        'price',
        'paymentStatusId',
        'createdAt',
        'updatedAt',
      ])
      .include([
        {
          attributes: ['id', 'title'],
          model: PaymentStatus,
          as: 'paymentStatus',
        },
      ])
      .limit(filter.limit)
      .offset(filter.offset)
      .order({ orderBy: filter.orderBy, sortOrder: filter.sortOrder });
    return {
      result: await this.repository.findAll(queryBuilder.build()),
      total: count,
    };
  }

  async getOne(user: IUser, paymentId: bigint) {
    const item = await this.repository.findOne(
      new QueryOptionsBuilder()
        .attributes([
          'id',
          'crmUserId',
          'firstname',
          'lastname',
          'price',
          'paymentStatusId',
          'createdAt',
          'updatedAt',
        ])
        .include([
          {
            attributes: ['id', 'title'],
            model: PaymentStatus,
            as: 'paymentStatus',
          },
        ])
        .filter({ crmUserId: user.id })
        .filter({ id: paymentId })
        .build(),
    );
    if (!item) {
      throw new NotFoundException('the item with this given id not founded!');
    }
    return {
      result: item,
    };
  }
}
