import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ebayData } from "./data";
import { CreateEbayItemDto } from "src/ebay-item/dto/create-ebay-item.dto";
import { EbayItemRepository } from "src/ebay-item/ebay-item.repository";
import { Item } from "src/finding/dto/findCompletedItemsResponse.dto";

@Injectable()
export class EbayDataSeederService {

  constructor(
    @InjectRepository(EbayItemRepository)
    private readonly  ebayItemRepository: EbayItemRepository,
  ) {}

  create(): Array<Promise<Item>> {
    return ebayData.map(async (ebayItem: CreateEbayItemDto) => {
      return await this.ebayItemRepository
        .findOne({ itemId: ebayItem.itemId })
        .then(async dbEbayItem => {
          if (dbEbayItem) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            await this.ebayItemRepository.createEbayItem(ebayItem),
          );
        })
        .catch(error => Promise.reject(error));
    });
  }
}