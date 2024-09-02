import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUser } from '@rahino/auth/interface';
import axios from 'axios';
import { CrmSessionService } from '../crm-session/crm-session.service';
import {
  CrmTerminalResponseInterface,
  DescribeCrmTerminalResultInterface,
} from './interface';
import { operator } from './enum';

@Injectable()
export class CrmTerminalService {
  constructor(private readonly sessionService: CrmSessionService) {}

  async getTerminals(
    user: IUser,
  ): Promise<DescribeCrmTerminalResultInterface[]> {
    const session = await this.sessionService.getSession();
    const response = await axios.get(
      `https://neka.crm24.io/webservice.php?operation=query&sessionName=${session.sessionName}&query=SELECT id, cf_1385, cf_1750, cf_1409, cf_1441 FROM vtcmTerminals where cf_1409=${user.id};`,
    );
    const data = response.data as CrmTerminalResponseInterface;
    if (!data.success) {
      throw new InternalServerErrorException('cannot get terminals');
    }
    return data.result.map((x) => ({
      id: x.id,
      terminalSim: x.cf_1385,
      operatorName: x.cf_1750 as operator,
      userId: x.cf_1409,
      terminalType: x.cf_1441,
    }));
  }
}
