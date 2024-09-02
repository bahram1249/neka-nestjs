import { Module } from '@nestjs/common';
import { FactorService } from './factor.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Factor } from '@rahino/database/models/neka/factor.entity';

@Module({
  imports: [SequelizeModule.forFeature([Factor])],
  providers: [FactorService],
  exports: [FactorService],
})
export class FactorModule {}
