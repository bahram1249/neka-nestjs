import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as md5 from 'md5';
import { GetSessionResponseInterface } from './interface';
import { CrmTokenService } from '../crm-token/crm-token.service';
import { SessionResultInterface } from './interface/session-result.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ADMIN_SESSION_KEY } from './constants';

@Injectable()
export class CrmSessionService {
  constructor(
    private readonly config: ConfigService,
    private readonly crmTokenService: CrmTokenService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  private async generateSession(
    username: string,
    token: string,
  ): Promise<SessionResultInterface> {
    const prefixAuthToken = this.config.get<string>('PREFIX_AUTH_TOKEN');
    const accessKey = md5(token + prefixAuthToken);
    const response = await axios.post('https://neka.crm24.io/webservice.php', {
      operation: 'login',
      username: username,
      token: token,
      accessKey: accessKey,
    });
    const data = response.data as GetSessionResponseInterface;
    if (!data.success) {
      throw new InternalServerErrorException('cannot get session');
    }
    return data.result;
  }

  public async getSession(): Promise<SessionResultInterface> {
    const cache = await this.cacheManager.get(ADMIN_SESSION_KEY);
    if (cache) return cache as SessionResultInterface;
    const username = this.config.get<string>('ADMIN_USERNAME');
    const crmToken = await this.crmTokenService.getToken(username);
    const result = await this.generateSession(username, crmToken);
    await this.cacheManager.set(ADMIN_SESSION_KEY, result, 300000);
    return result;
  }
}
