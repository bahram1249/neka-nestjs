import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { CrmSessionService } from '../crm-session/crm-session.service';
import { Factor } from '@rahino/database/models/neka/factor.entity';
import { formatDate } from '@rahino/commontools';

@Injectable()
export class CrmFactorService {
  constructor(private readonly sessionService: CrmSessionService) {}

  async generateFactor(factor: Factor) {
    const session = await this.sessionService.getSession();
    const response = await axios.postForm(
      'https://neka.crm24.io/webservice.php',
      {
        operation: 'create',
        sessionName: session.sessionName,
        elementType: 'invoice',
        element: {
          subject: 'خرید ' + factor.deltasibServiceDescription,
          createdtime: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          duedate: formatDate(new Date(), 'yyyy-MM-dd'),
          contact_id: factor.crmUserId,
          productid: factor.crmProductId,
          invoicedate: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          invoicestatus: '1',
          cf_1681: '64x53003',
          LineItems: [
            {
              productid: factor.crmProductId,
              listprice: factor.price,
              quantity: '1',
            },
          ],
          assigned_user_id: '19x12',
        },
      },
    );
    // const data = response.data;
    // if (!data.success) {
    //   throw new InternalServerErrorException('cannot create factor for crm');
    // }
    return;
  }
}
