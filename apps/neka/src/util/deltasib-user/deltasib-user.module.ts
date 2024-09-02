import { Module } from '@nestjs/common';
import { DeltasibUserService } from './deltasib-user.service';
import { DeltasibTokenModule } from '../deltasib-token/deltasib-token.module';

@Module({
  imports: [DeltasibTokenModule],
  providers: [DeltasibUserService],
  exports: [DeltasibUserService],
})
export class DeltasibUserModule {}
