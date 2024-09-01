import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import { sha512 } from '@noble/hashes/sha512';
import { DeltaSibTokenResponse } from './interface';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { DELTASIB_KEY } from './constants';
import * as https from 'https';

@Injectable()
export class DeltasibTokenService {
  constructor(
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  private async generateToken(username: string, password: string) {
    const apiKey = sha512(password);
    const response = await axios.post(
      'https://185.126.8.124:1043/1.0/auth/',
      {
        Action: 'gettoken',
        Api_Username: username,
        Api_Key: Buffer.from(apiKey).toString('hex'),
      },
      {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const data = response.data as DeltaSibTokenResponse;
    if (!data.token) {
      throw new InternalServerErrorException('cannot get deltasib token');
    }
    return data.token;
  }

  async getToken() {
    const cache = await this.cacheManager.get(DELTASIB_KEY);
    if (cache) return cache as string;
    const username = this.config.get<string>('DELTASIB_USERNAME');
    const password = this.config.get<string>('DELTASIB_PASSWORD');
    const result = await this.generateToken(username, password);
    await this.cacheManager.set(DELTASIB_KEY, result, 300000);
    return result;
  }
}
