import { Injectable } from '@nestjs/common';
import { IUser } from '@rahino/auth/interface';
import { CrmTerminalService } from '../util/crm-terminal/crm-terminal.service';

@Injectable()
export class TerminalService {
  constructor(private readonly contactService: CrmTerminalService) {}

  async getAll(user: IUser) {
    return {
      result: await this.contactService.getTerminals(user),
    };
  }
}
