import { TransactionTypeEnum } from '../enum';

export interface RequestInterface {
  transactionType: TransactionTypeEnum;
  terminalId: string;
  acceptorId: string;
  amount: number;
  revertUri: string;
  requestId: string;
  requestTimestamp: number;
}
