import { Test, TestingModule } from '@nestjs/testing';
import { SvgService } from './svg.service';

describe('SvgService', () => {
  let service: SvgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SvgService],
    }).compile();

    service = module.get<SvgService>(SvgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
