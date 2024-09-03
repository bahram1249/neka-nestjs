import { TransactionTypeEnum } from '../enum';

export interface RequestInterface {
  transactionType: TransactionTypeEnum;
  terminalId: string;
  acceptorId: string;
  amount: bigint;
  revertUri: string;
  requestId: string;
  requestTimestamp: number;
}
