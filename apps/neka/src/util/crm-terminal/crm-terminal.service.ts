import { Injectable } from '@nestjs/common';
import { IUser } from '@rahino/auth/interface';
import axios from 'axios';

@Injectable()
export class CrmTerminalService {
  constructor() {}

  async getTerminals(user: IUser) {
    console.log(user);
    const response = await axios.get(
      `https://neka.crm24.io/webservice.php?operation=query&sessionName=${user.sessionName}&query=SELECT cf_1385 FROM vtcmTerminals where cf_1409=${user.userId};`,
    );
    return response.data;
  }
}
