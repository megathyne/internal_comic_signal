import { Test, TestingModule } from '@nestjs/testing';
import { FindingController } from './finding.controller';

describe('Finding Controller', () => {
  let controller: FindingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindingController],
    }).compile();

    controller = module.get<FindingController>(FindingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
