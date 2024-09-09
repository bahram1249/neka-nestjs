import { Injectable } from '@nestjs/common';
import { DeltasibTokenService } from '../deltasib-token/deltasib-token.service';
import axios from 'axios';
import * as https from 'https';
import {
  DeltasibUserResponseInterface,
  DeltasibUserResultInterface,
} from './interface';

@Injectable()
export class DeltasibUserService {
  constructor(private readonly deltasibTokenService: DeltasibTokenService) {}

  async getUserByTerminalSim(
    terminalSim: string,
  ): Promise<DeltasibUserResultInterface> {
    const token = await this.deltasibTokenService.getToken();
    const response = await axios.get(
      `https://185.126.8.124:1043/1.0/user/?Action=list&Filter=Username='${terminalSim}'`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      },
    );
    const result = response.data as DeltasibUserResponseInterface[];
    return result.length > 0
      ? result.map((x) => ({
          userId: x.user_id,
          username: x.username,
          name: x.name,
          family: x.family,
          address: x.address,
        }))[0]
      : null;
  }
}
