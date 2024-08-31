import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto';
import { AuthService } from './auth.service';
import { CrmContactService } from '../util/crm-contact/crm-contact.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly authService: AuthService,
    private readonly contactService: CrmContactService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.contactService.findUser(dto.username, dto.password);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }
    const token = await this.authService.signToken(user);
    return {
      result: token,
    };
  }
}
