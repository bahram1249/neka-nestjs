import { CrmProductResultInterface } from './crm-product-result.interface';

export interface CrmProductResponseInterface {
  success: boolean;
  result: CrmProductResultInterface[];
}
