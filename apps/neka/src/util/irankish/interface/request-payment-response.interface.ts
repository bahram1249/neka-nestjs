import { TransactionTypeEnum } from '../enum';

export interface RequestPaymentResponseInterface {
  description: string;
  responseCode: string;
  result: {
    billInfo: {
      billId: string;
      billPaymentId: string;
    };
    expiryTimestamp: number;
    initiateTimestamp: number;
    token: string;
    transactionType: TransactionTypeEnum;
  };
  status: boolean;
}
