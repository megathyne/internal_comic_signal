import { Test, TestingModule } from '@nestjs/testing';
import { GraderService } from './grader.service';

describe('GraderService', () => {
  let service: GraderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraderService],
    }).compile();

    service = module.get<GraderService>(GraderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
