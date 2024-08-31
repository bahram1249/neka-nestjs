import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreditInfoService } from './credit-info.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '@rahino/auth/decorator';
import { IUser } from '@rahino/auth/interface';
import { JsonResponseTransformInterceptor } from '@rahino/response/interceptor';
import { JwtGuard } from '@rahino/auth/guard';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@UseInterceptors(JsonResponseTransformInterceptor)
@Controller({
  path: '/api/neka/creditInfos',
  version: ['1'],
})
export class CreditInfoController {
  constructor(private service: CreditInfoService) {}

  @Get('/:terminalSim')
  @HttpCode(HttpStatus.OK)
  async getByTerminalSim(
    @Param('terminalSim') terminalSim: string,
    @GetUser() user: IUser,
  ) {
    return await this.service.getByTerminalSim(terminalSim, user);
  }
}
