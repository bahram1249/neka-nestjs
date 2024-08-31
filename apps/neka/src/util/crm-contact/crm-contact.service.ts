import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CrmContactService {
  constructor() {}

  async getCurrentSession(sessionName: string) {
    const response = await axios.get(
      `https://neka.crm24.io/webservice.php?operation=query&sessionName=${sessionName}&query=SELECT TOP 100 * FROM Contacts'`,
    );
    return response.data;
  }
}
