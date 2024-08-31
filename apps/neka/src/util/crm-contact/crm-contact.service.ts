import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { CrmSessionService } from '../crm-session/crm-session.service';
import {
  CrmContactResponseInterface,
  CrmContactResultInterface,
} from './interface';

@Injectable()
export class CrmContactService {
  constructor(private readonly sessionService: CrmSessionService) {}

  async findUser(
    username: string,
    password: string,
  ): Promise<CrmContactResultInterface> {
    const session = await this.sessionService.getSession();
    const response = await axios.get(
      `https://neka.crm24.io/webservice.php?operation=query&sessionName=${session.sessionName}&query=SELECT 
      id, firstname, lastname, account_id, mobile
      FROM Contacts WHERE cf_1123='${username}' AND cf_1785='${password}';`,
    );
    const data = response.data as CrmContactResponseInterface;
    if (!data.success) {
      throw new InternalServerErrorException('cannot get contacts');
    }
    if (data) return data.result.length > 0 ? data.result[0] : null;
  }
}
