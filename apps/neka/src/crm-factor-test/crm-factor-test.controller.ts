import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { JsonResponseTransformInterceptor } from '@rahino/response/interceptor';
import { CrmFactorTestService } from './crm-factor-test.service';

@UseInterceptors(JsonResponseTransformInterceptor)
@Controller({
  path: '/api/neka/generateCrmFactors',
  version: ['1'],
})
export class GenerateCrmFactorController {
  constructor(private service: CrmFactorTestService) {}

  @Post('/:id')
  @HttpCode(HttpStatus.OK)
  async generateFactor(@Param('id') factorId: bigint) {
    return await this.service.generateFactor(factorId);
  }
}
