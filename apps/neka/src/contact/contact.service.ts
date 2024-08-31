import { Injectable } from '@nestjs/common';
import { IUser } from '@rahino/auth/interface';
import { CrmContactService } from '../util/crm-contact/crm-contact.service';

@Injectable()
export class ContactService {
  constructor(private readonly contactService: CrmContactService) {}

  async getAll(user: IUser) {
    return {
      result: await this.contactService.getCurrentSession(user.sessionName),
    };
  }
}
