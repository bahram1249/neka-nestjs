import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PurchaseService } from './purchase-service.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '@rahino/auth/decorator';
import { IUser } from '@rahino/auth/interface';
import { JsonResponseTransformInterceptor } from '@rahino/response/interceptor';
import { JwtGuard } from '@rahino/auth/guard';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@UseInterceptors(JsonResponseTransformInterceptor)
@Controller({
  path: '/api/neka/purchaseServices',
  version: ['1'],
})
export class PurchaseServiceController {
  constructor(private service: PurchaseService) {}

  @Get('/:terminalSim')
  @HttpCode(HttpStatus.OK)
  async getByTerminalSim(
    @Param('terminalSim') terminalSim: string,
    @GetUser() user: IUser,
  ) {
    return await this.service.getByTerminalSim(terminalSim, user);
  }
}
