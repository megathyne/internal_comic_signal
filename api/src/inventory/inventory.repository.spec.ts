import { Test } from '@nestjs/testing';
import { InventoryRepository } from './inventory.repository';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { ConflictException } from '@nestjs/common';

const mockCreateInventoryDto: CreateInventoryDto = {
  bin: 1,
  comicId: 1,
  quantity: 1,
};

describe('InventoryRepository', () => {
  let inventoryRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [InventoryRepository],
    }).compile();

    inventoryRepository = await module.get<InventoryRepository>(InventoryRepository);
  });

  describe('create inventory', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      inventoryRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully saves a new inventory', () => {
      save.mockResolvedValue(undefined);
      expect(inventoryRepository.createInventory(mockCreateInventoryDto)).resolves.not.toThrow();
    });

    it('throws a confict exception as comic already exists', () => {
      save.mockRejectedValue({ code: '23505' }); /// unhandled error code
      expect(inventoryRepository.createInventory(mockCreateInventoryDto)).rejects.toThrow(ConflictException);
    });
  });
});
