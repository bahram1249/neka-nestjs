import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { IranKishPaymentService } from './irankish-payment.service';
import { VerifyDto } from './dto';
import { Response } from 'express';

@Controller({
  path: '/api/neka/payments/irankish',
  version: ['1'],
})
export class IranKishPaymentController {
  constructor(private service: IranKishPaymentService) {}

  @Post('/verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Res() res: Response, @Body() dto: VerifyDto) {
    return await this.service.verify(res, dto);
  }
}
