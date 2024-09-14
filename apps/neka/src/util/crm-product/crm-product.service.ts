import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { CrmSessionService } from '../crm-session/crm-session.service';
import {
  CrmProductResponseInterface,
  CrmProductResultInterface,
} from './interface';

@Injectable()
export class CrmProductService {
  constructor(private readonly sessionService: CrmSessionService) {}

  async findProduct(
    deltasibServiceId: string,
  ): Promise<CrmProductResultInterface> {
    const session = await this.sessionService.getSession();
    const response = await axios.get(
      `https://neka.crm24.io/webservice.php?operation=query&sessionName=${session.sessionName}&query=SELECT id, productname, product_no, vendor_id, creator, cf_1789 FROM Products WHERE cf_1789='${deltasibServiceId}';`,
    );
    const data = response.data as CrmProductResponseInterface;
    if (!data.success) {
      throw new InternalServerErrorException('cannot get product');
    }
    return data.result.length > 0 ? data.result[0] : null;
  }
}
