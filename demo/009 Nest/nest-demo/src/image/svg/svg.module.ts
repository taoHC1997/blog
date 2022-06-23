import { Module } from '@nestjs/common';
import { SvgService } from './svg.service';
import { SvgController } from './svg.controller';

@Module({
  controllers: [SvgController],
  providers: [SvgService],
  exports: [SvgService],
})
export class SvgModule {}
