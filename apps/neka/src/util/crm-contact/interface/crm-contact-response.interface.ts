import { CrmContactResultInterface } from './crm-contact-result.interface';

export interface CrmContactResponseInterface {
  success: boolean;
  result: CrmContactResultInterface[];
}
