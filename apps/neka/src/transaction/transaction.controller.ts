import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '@rahino/auth/decorator';
import { IUser } from '@rahino/auth/interface';
import { JsonResponseTransformInterceptor } from '@rahino/response/interceptor';
import { JwtGuard } from '@rahino/auth/guard';
import { TransactionService } from './transaction.service';
import { ListFilter } from '@rahino/query-filter';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@UseInterceptors(JsonResponseTransformInterceptor)
@Controller({
  path: '/api/neka/transactions',
  version: ['1'],
})
export class TransactionController {
  constructor(private service: TransactionService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll(@GetUser() user: IUser, @Query() filter: ListFilter) {
    return await this.service.getAll(user, filter);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getOne(@GetUser() user: IUser, @Param('id') paymentId: bigint) {
    return await this.service.getOne(user, paymentId);
  }
}
