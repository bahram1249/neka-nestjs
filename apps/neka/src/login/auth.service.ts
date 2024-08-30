import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GetSessionResponseInterface } from '../util/crm-generate-session/interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private jwt: JwtService,
  ) {}

  public async signToken(
    username: string,
    session: GetSessionResponseInterface,
  ): Promise<{ access_token: string }> {
    const payload = {
      username: username,
      sessionName: session.result.sessionName,
      userId: session.result.userId,
      version: session.result.version,
      vtigerVersion: session.result.vtigerVersion,
    };
    const secret = this.config.get<string>('JWT_SECRET');
    const tokenExpiration = this.config.get<string>('TOKEN_EXPIRATION');

    const token = await this.jwt.signAsync(payload, {
      secret: secret,
      expiresIn: tokenExpiration,
    });

    return {
      access_token: token,
    };
  }
}
