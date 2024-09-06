import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Factor } from '@rahino/database/models/neka/factor.entity';
import { Payment } from '@rahino/database/models/neka/payment.entity';
import { PaymentStatusEnum } from '@rahino/neka/helper/enum';
import { TransactionTypeEnum } from '@rahino/neka/util/irankish/enum';
import { RequestInterface } from '@rahino/neka/util/irankish/interface';
import { IranKishService } from '@rahino/neka/util/irankish/irankish.service';
import ShortUniqueId from 'short-unique-id';
import { VerifyDto } from './dto';
import { QueryOptionsBuilder } from '@rahino/query-filter/sequelize-query-builder';
import { FactorService } from '@rahino/neka/factor/factor.service';
import { Response } from 'express';
import { Sequelize, Transaction } from 'sequelize';
import * as _ from 'lodash';

@Injectable()
export class IranKishPaymentService {
  private frontEndUrl: string;
  constructor(
    private readonly irankishService: IranKishService,
    private readonly factorService: FactorService,
    private readonly config: ConfigService,
    @InjectModel(Payment)
    private readonly paymentRepostiory: typeof Payment,
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {
    this.frontEndUrl = this.config.get<string>('BASE_FRONT_URL');
  }

  async generatePaymentFromFactor(
    factor: Factor,
    transaction?: Transaction,
  ): Promise<Payment> {
    const terminalId = this.config.get<string>('IranKishTerminalId');
    const passPhrase = this.config.get<string>('IranKishPassPhrase');
    const merchantId = this.config.get<string>('IranKishMerchantId');
    const baseUrl = this.config.get<string>('BASE_URL');
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    // authentication
    const authenticationEnvelope =
      this.irankishService.generateAuthenticationEnvelope(
        Number(factor.price),
        terminalId,
        passPhrase,
      );

    // request body
    const request: RequestInterface = {
      acceptorId: merchantId,
      amount: Number(factor.price),
      requestTimestamp: Math.round(new Date().getTime() / 1000),
      terminalId: terminalId,
      transactionType: TransactionTypeEnum.purchase,
      requestId: randomUUID(),
      revertUri: baseUrl + '/v1/api/neka/payments/irankish/verify',
    };

    // request
    const response = await this.irankishService.requestPayment({
      authenticationEnvelope: authenticationEnvelope,
      request: request,
    });

    if (!response.status) {
      throw new BadRequestException(response.description);
    }

    const payment = await this.paymentRepostiory.create(
      {
        crmUserId: factor.crmUserId,
        firstname: factor.firstname,
        lastname: factor.lastname,
        price: factor.price,
        factorId: factor.id,
        paymentStatusId: PaymentStatusEnum.unpaid,
        paymentToken: response.result.token,
        responseCode: response.responseCode,
        merchantId: request.acceptorId,
        clientRequestId: request.requestId,
        terminalId: terminalId,
      },
      {
        transaction: transaction,
      },
    );

    return payment;
  }

  async verify(res: Response, dto: VerifyDto) {
    const transaction = await this.sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });
    let payment: Payment;
    try {
      payment = await this.paymentRepostiory.findOne(
        new QueryOptionsBuilder()
          .filter({ paymentToken: dto.token })
          .filter({ paymentStatusId: PaymentStatusEnum.unpaid })
          .transaction(transaction)
          .build(),
      );
      if (!payment) {
        throw new BadRequestException('invalid data');
      }
      if (payment.price.toString() != dto.amount) {
        throw new BadRequestException('invalid data');
      }
      if (payment.clientRequestId != dto.RequestId) {
        throw new BadRequestException('invalid data');
      }
      if (payment.merchantId != dto.acceptorId) {
        throw new BadRequestException('invalid data');
      }

      const verify = await this.irankishService.verify({
        retrievalReferenceNumber: dto.retrievalReferenceNumber,
        systemTraceAuditNumber: dto.systemTraceAuditNumber,
        terminalId: payment.terminalId,
        tokenIdentity: payment.paymentToken,
      });

      if (!verify.status) {
        payment.paymentStatusId = PaymentStatusEnum.failed;
        payment.paymentResult = `${verify.description}(${verify.responseCode})`;

        const updated = await Payment.update(_.omit(payment, ['id']), {
          where: {
            id: payment.id,
          },
          transaction: transaction,
          returning: true,
        })[1][0];
        payment = updated[1][0];
        await transaction.commit();

        return res.redirect(
          301,
          this.frontEndUrl + `/transactions/${payment.id}`,
        );
      }

      payment.paymentStatusId = PaymentStatusEnum.success;
      payment.retrievalReferenceNumber = dto.retrievalReferenceNumber;
      payment.systemTraceAuditNumber = dto.systemTraceAuditNumber;
      payment.paymentResult = `${verify.description}(${verify.responseCode})`;

      await this.factorService.finnalStatus(payment.factorId, transaction);

      const updated = await Payment.update(_.omit(payment, ['id']), {
        where: { id: payment.id },
        transaction: transaction,
        returning: true,
      });
      payment = updated[1][0];

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new InternalServerErrorException(error.message);
    }
    return res.redirect(301, this.frontEndUrl + `/transactions/${payment.id}`);
  }
}
