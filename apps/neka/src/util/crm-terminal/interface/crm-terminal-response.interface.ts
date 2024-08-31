import { CrmTerminalResultInterface } from './crm-terminal-result.interface';

export interface CrmTerminalResponseInterface {
  success: boolean;
  result: CrmTerminalResultInterface[];
}
