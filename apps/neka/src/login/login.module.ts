import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtStrategy } from '@rahino/auth/strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { CrmContactModule } from '../util/crm-contact/crm-contact.module';

@Module({
  imports: [CrmContactModule, JwtModule.register({})],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy, AuthService],
})
export class LoginModule {}
