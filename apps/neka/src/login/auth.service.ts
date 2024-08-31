import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '@rahino/auth/interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private jwt: JwtService,
  ) {}

  public async signToken(user: IUser): Promise<{ access_token: string }> {
    const secret = this.config.get<string>('JWT_SECRET');
    const tokenExpiration = this.config.get<string>('TOKEN_EXPIRATION');

    const token = await this.jwt.signAsync(user, {
      secret: secret,
      expiresIn: tokenExpiration,
    });

    return {
      access_token: token,
    };
  }
}
