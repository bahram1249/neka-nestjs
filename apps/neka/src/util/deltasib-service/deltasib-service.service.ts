import { Injectable } from '@nestjs/common';
import { DeltasibTokenService } from '../deltasib-token/deltasib-token.service';
import axios from 'axios';
import * as https from 'https';
import {
  DeltasibServiceResponseInterface,
  DeltasibServiceResultInterface,
} from './interface';

@Injectable()
export class DeltasibServiceService {
  constructor(private readonly deltasibTokenService: DeltasibTokenService) {}

  async getAll(): Promise<DeltasibServiceResultInterface[]> {
    const token = await this.deltasibTokenService.getToken();
    const response = await axios.get(
      `https://185.126.8.124:1043/1.0/service/?Action=list&Filter=UserChoosable='yes' and ISEnable = 'yes' and ServiceType='Base'`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      },
    );
    const result = response.data as DeltasibServiceResponseInterface[];
    return result.map((x) => ({
      serviceId: x.Service_Id,
      serviceName: x.ServiceName,
      description: x.Description,
      price: x.Price,
      serviceType: x.ServiceType,
      isEnable: x.ISEnable,
      userChoosable: x.UserChoosable,
      resellerChoosable: x.ResellerChoosable,
    }));
  }
}
