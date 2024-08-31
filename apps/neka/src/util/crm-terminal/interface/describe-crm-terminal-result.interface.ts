import { operator } from '../enum';

export interface DescribeCrmTerminalResultInterface {
  id: string;
  terminalSim: string;
  operatorName: operator;
  userId: string;
}
