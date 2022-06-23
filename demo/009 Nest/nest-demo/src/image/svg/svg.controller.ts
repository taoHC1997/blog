import { Controller, Get } from '@nestjs/common';
import { SvgService } from './svg.service';

@Controller('image/svg')
export class SvgController {
  constructor(private readonly svgService: SvgService) {}

  // 测试
  @Get('test')
  test() {
    return this.svgService.test();
  }
}
