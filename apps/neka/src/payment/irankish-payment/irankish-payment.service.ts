import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Factor } from '@rahino/database/models/neka/factor.entity';
import { Payment } from '@rahino/database/models/neka/payment.entity';
import { PaymentStatusEnum } from '@rahino/neka/helper/enum';
import { TransactionTypeEnum } from '@rahino/neka/util/irankish/enum';
import { RequestInterface } from '@rahino/neka/util/irankish/interface';
import { IranKishService } from '@rahino/neka/util/irankish/irankish.service';

@Injectable()
export class IranKishPaymentService {
  constructor(
    private readonly irankishService: IranKishService,
    private readonly config: ConfigService,
    @InjectModel(Payment)
    private readonly paymentRepostiory: typeof Payment,
  ) {}

  async generatePaymentFromFactor(factor: Factor): Promise<Payment> {
    const terminalId = this.config.get<string>('IranKishTerminalId');
    const passPhrase = this.config.get<string>('IranKishPassPhrase');
    const merchantId = this.config.get<string>('IranKishMerchantId');
    const baseUrl = this.config.get<string>('BASE_URL');

    // authentication
    const authenticationEnvelope =
      this.irankishService.generateAuthenticationEnvelope(
        factor.price,
        terminalId,
        passPhrase,
      );

    // request body
    const request: RequestInterface = {
      acceptorId: merchantId,
      amount: factor.price,
      requestTimestamp: new Date().getTime(),
      terminalId: terminalId,
      transactionType: TransactionTypeEnum.purchase,
      requestId: new Date().getTime().toString(),
      revertUri: baseUrl + '/v1/api/neka/payments/irankish/confirm',
    };

    // request
    const requestPaymentResponse = await this.irankishService.requestPayment({
      authenticationEnvelope: authenticationEnvelope,
      request: request,
    });
    if (!requestPaymentResponse.status) {
      throw new BadRequestException(requestPaymentResponse.description);
    }

    const payment = await this.paymentRepostiory.create({
      crmUserId: factor.crmUserId,
      firstname: factor.firstname,
      lastname: factor.lastname,
      price: factor.price,
      factorId: factor.id,
      paymentStatusId: PaymentStatusEnum.unpaid,
      paymentToken: requestPaymentResponse.result.token,
      responseCode: requestPaymentResponse.responseCode,
      merchantId: request.acceptorId,
      clientRequestId: request.requestId,
      terminalId: terminalId,
    });

    return payment;
  }
}
