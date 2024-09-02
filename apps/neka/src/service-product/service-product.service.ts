import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '@rahino/auth/interface';
import { DeltasibServiceService } from '../util/deltasib-service/deltasib-service.service';

@Injectable()
export class ServiceProductService {
  constructor(
    private readonly deltasibServiceService: DeltasibServiceService,
  ) {}

  async getAll(user: IUser) {
    return {
      result: await this.deltasibServiceService.getAll(),
    };
  }
}
