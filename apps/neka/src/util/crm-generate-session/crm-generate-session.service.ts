import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as md5 from 'md5';
import { GetSessionResponseInterface } from './interface';

@Injectable()
export class CrmGenerateSessionService {
  constructor(private readonly config: ConfigService) {}

  async generateSession(
    username: string,
    token: string,
  ): Promise<GetSessionResponseInterface> {
    const prefixAuthToken = this.config.get<string>('PREFIX_AUTH_TOKEN');
    const accessKey = md5(token + prefixAuthToken);
    const response = await axios.post(`https://neka.crm24.io/webservice.php`, {
      operation: 'login',
      username: username,
      token: token,
      accessKey: accessKey,
    });
    return response.data as GetSessionResponseInterface;
  }
}
