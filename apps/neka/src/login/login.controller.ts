import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto';

@Controller({
  path: '/api/neka/login',
  version: ['1'],
})
export class LoginController {
  constructor(private service: LoginService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return await this.service.login(dto);
  }
}
