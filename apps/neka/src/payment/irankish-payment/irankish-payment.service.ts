import { Injectable } from '@nestjs/common';
import { Factor } from '@rahino/database/models/neka/factor.entity';
import { IranKishService } from '@rahino/neka/util/irankish/irankish.service';

@Injectable()
export class IranKishPaymentService {
  constructor(private readonly irankishService: IranKishService) {}

  async generatePaymentFromFactor(factor: Factor) {}
}
