import { Module } from '@nestjs/common';
import { ServiceProductService } from './service-product.service';
import { ServiceProductController } from './service-product.controller';
import { DeltasibServiceModule } from '../util/deltasib-service/deltasib-service.module';

@Module({
  imports: [DeltasibServiceModule],
  controllers: [ServiceProductController],
  providers: [ServiceProductService],
  exports: [ServiceProductService],
})
export class ServiceProductModule {}
