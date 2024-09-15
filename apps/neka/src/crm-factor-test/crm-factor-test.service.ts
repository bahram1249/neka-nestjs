import { Injectable } from '@nestjs/common';
import { CrmFactorService } from '../util/crm-factor/crm-factor.service';
import { InjectModel } from '@nestjs/sequelize';
import { Factor } from '@rahino/database/models/neka/factor.entity';
import { QueryOptionsBuilder } from '@rahino/query-filter/sequelize-query-builder';

@Injectable()
export class CrmFactorTestService {
  constructor(
    private readonly crmFactorService: CrmFactorService,
    @InjectModel(Factor) private readonly factorRepository: typeof Factor,
  ) {}

  async generateFactor(factorId: bigint) {
    const factor = await this.factorRepository.findOne(
      new QueryOptionsBuilder().filter({ id: factorId }).build(),
    );
    await this.crmFactorService.generateFactor(factor);
    return {
      result: true,
    };
  }
}
