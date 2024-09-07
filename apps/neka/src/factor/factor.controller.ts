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

import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GetUser } from '@rahino/auth/decorator';
import { IUser } from '@rahino/auth/interface';
import { JsonResponseTransformInterceptor } from '@rahino/response/interceptor';
import { JwtGuard } from '@rahino/auth/guard';
import { ListFilter } from '@rahino/query-filter';
import { FactorService } from './factor.service';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@UseInterceptors(JsonResponseTransformInterceptor)
@Controller({
  path: '/api/neka/factors',
  version: ['1'],
})
export class FactorController {
  constructor(private service: FactorService) {}

  @ApiQuery({
    name: 'filter',
    type: ListFilter,
    style: 'deepObject',
    explode: true,
  })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll(@GetUser() user: IUser, @Query() filter: ListFilter) {
    return await this.service.getAll(user, filter);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getOne(@GetUser() user: IUser, @Param('id') factorId: bigint) {
    return await this.service.getOne(user, factorId);
  }
}
