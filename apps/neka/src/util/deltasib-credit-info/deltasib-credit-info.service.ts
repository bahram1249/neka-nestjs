import { Injectable } from '@nestjs/common';
import { DeltasibTokenService } from '../deltasib-token/deltasib-token.service';
import axios from 'axios';
import * as https from 'https';
import {
  DeltasibCreditInfoResponseInterface,
  DeltasibCreditInfoResultInterface,
} from './interface';

@Injectable()
export class DeltasibCreditInfoService {
  constructor(private readonly deltasibTokenService: DeltasibTokenService) {}

  async findCreditInfo(
    terminalSim: string,
  ): Promise<DeltasibCreditInfoResultInterface[]> {
    const token = await this.deltasibTokenService.getToken();
    const response = await axios.get(
      `https://185.126.8.124:1043/1.0/user/?Action=creditinfo&User_Id=0&Filter=Username=${terminalSim}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      },
    );

    const result = response.data as DeltasibCreditInfoResponseInterface[];
    return result.map((x) => ({
      serviceStatus: x.ServiceStatus,
      serviceName: x.ServiceName,
      startDate: x.StartDate,
      endDate: x.EndDate,
      leftCredit: x.STrR,
      totalCredit: x.STrA,
      period: x.Period,
    }));
  }
}
