import { Module } from '@nestjs/common';
import { DeltasibServiceService } from './deltasib-service.service';
import { DeltasibTokenModule } from '../deltasib-token/deltasib-token.module';

@Module({
  imports: [DeltasibTokenModule],
  providers: [DeltasibServiceService],
  exports: [DeltasibServiceService],
})
export class DeltasibServiceModule {}
