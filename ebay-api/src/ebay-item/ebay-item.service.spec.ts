import { Test, TestingModule } from '@nestjs/testing';
import { EbayItemService } from './ebay-item.service';

describe('EbayItemService', () => {
  let service: EbayItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EbayItemService],
    }).compile();

    service = module.get<EbayItemService>(EbayItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
