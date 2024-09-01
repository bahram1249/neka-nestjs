import { Injectable } from '@nestjs/common';
import { DeltasibTokenService } from '../deltasib-token/deltasib-token.service';
import axios from 'axios';
import * as https from 'https';

@Injectable()
export class DeltasibCreditInfoService {
  constructor(private readonly deltasibTokenService: DeltasibTokenService) {}

  async findCreditInfo(terminalSim: string) {
    const token = await this.deltasibTokenService.getToken();
    const response = await axios.get(
      `https://185.126.8.124:1043/1.0/user/?Action=creditinfo&User_Id=0&filter=Username= ${terminalSim} `,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'form-data',
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      },
    );
    return response.data;
  }
}
