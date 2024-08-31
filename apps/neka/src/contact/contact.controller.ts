import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '@rahino/auth/decorator';
import { IUser } from '@rahino/auth/interface';
import { JsonResponseTransformInterceptor } from '@rahino/response/interceptor';
import { JwtGuard } from '@rahino/auth/guard';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@UseInterceptors(JsonResponseTransformInterceptor)
@Controller({
  path: '/api/neka/contacts',
  version: ['1'],
})
export class ContactController {
  constructor(private service: ContactService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll(@GetUser() user: IUser) {
    return await this.service.getAll(user);
  }
}
