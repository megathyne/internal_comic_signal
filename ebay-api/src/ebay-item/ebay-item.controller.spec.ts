import { Test, TestingModule } from '@nestjs/testing';
import { EbayItemController } from './ebay-item.controller';

describe('EbayItem Controller', () => {
  let controller: EbayItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EbayItemController],
    }).compile();

    controller = module.get<EbayItemController>(EbayItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
