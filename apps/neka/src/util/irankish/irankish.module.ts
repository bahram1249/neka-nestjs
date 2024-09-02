import { Module } from '@nestjs/common';
import { IranKishService } from './irankish.service';

@Module({
  providers: [IranKishService],
  exports: [IranKishService],
})
export class IranKishModule {}
