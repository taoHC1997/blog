import { Test, TestingModule } from '@nestjs/testing';
import { SvgController } from './svg.controller';

describe('SvgController', () => {
  let controller: SvgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SvgController],
    }).compile();

    controller = module.get<SvgController>(SvgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
