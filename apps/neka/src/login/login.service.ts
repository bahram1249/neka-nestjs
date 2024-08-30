import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto';
import { CrmTokenService } from '../util/crm-token/crm-token.service';
import { CrmGenerateSessionService } from '../util/crm-generate-session/crm-generate-session.service';
import { AuthService } from './auth.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly tokenService: CrmTokenService,
    private readonly sessionService: CrmGenerateSessionService,
    private readonly authService: AuthService,
  ) {}

  async login(dto: LoginDto) {
    const crmToken = await this.tokenService.getToken(dto.username);
    const session = await this.sessionService.generateSession(
      dto.username,
      crmToken,
    );
    if (!session.result) {
      throw new BadRequestException('cannot register');
    }
    return {
      result: await this.authService.signToken(dto.username, session),
    };
  }
}
