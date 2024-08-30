import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetChallengeInterface } from './interface';

@Injectable()
export class CrmTokenService {
  constructor() {}

  async getToken(username: string): Promise<string> {
    const response = await axios.get(
      `https://neka.crm24.io/webservice.php?operation=getchallenge&username=${username}`,
    );
    const responseData = response.data as GetChallengeInterface;
    return responseData.result.token;
  }
}
