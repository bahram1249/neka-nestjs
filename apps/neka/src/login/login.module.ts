import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { CrmTokenModule } from '../util/crm-token/crm-token.module';
import { CrmGenerateSessionModule } from '../util/crm-generate-session/crm-generate-session.module';
import { JwtStrategy } from '@rahino/auth/strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [CrmTokenModule, CrmGenerateSessionModule, JwtModule.register({})],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy, AuthService],
})
export class LoginModule {}
