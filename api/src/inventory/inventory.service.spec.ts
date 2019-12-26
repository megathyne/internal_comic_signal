import { Test } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { InventoryRepository } from './inventory.repository';
import { GetInventoryFilterDto } from './dto/get-inventory-filter.dto';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 12, username: 'Test user' };

const mockInventoryRepository = () => ({
  getInventory: jest.fn(),
  findOne: jest.fn(),
  createInventory: jest.fn(),
  delete: jest.fn(),
});

describe('InventoryService', () => {
  let inventoryService;
  let inventoryRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [InventoryService, { provide: InventoryRepository, useFactory: mockInventoryRepository }],
    }).compile();

    inventoryService = await module.get<InventoryService>(InventoryService);
    inventoryRepository = await module.get<InventoryRepository>(InventoryRepository);
  });

  describe('getInventory', () => {
    it('gets all inventory from the repository', async () => {
      inventoryRepository.getInventory.mockResolvedValue('someValue');

      expect(inventoryRepository.getInventory).not.toHaveBeenCalled();
      const filters: GetInventoryFilterDto = { search: 'Some search query' };
      const result = await inventoryService.getInventory(filters, mockUser);
      expect(inventoryRepository.getInventory).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getInventoryById', () => {
    it('calls inventoryRepository.findOne() and succesffuly retrieve and return the inventory', async () => {
      const mockInventory = { bin: 1, comic: 'Special First Issue', quantity: 1 };
      inventoryRepository.findOne.mockResolvedValue(mockInventory);

      const result = await inventoryService.getInventoryById(1, mockUser);
      expect(result).toEqual(mockInventory);

      expect(inventoryRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });

    it('throws an error as inventory is not found', () => {
      inventoryRepository.findOne.mockResolvedValue(null);
      expect(inventoryService.getInventoryById(1, mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});
