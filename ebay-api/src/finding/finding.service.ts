import { Injectable, Logger, HttpService } from '@nestjs/common';
import { FindCompletedItemsResponse, Item } from './dto/FindCompletedItemsResponse.dto';
import { EbayItemService } from '../ebay-item/ebay-item.service';
import { FindCompletedItemsConfig } from 'src/ebay-item/dto/find-completed-items-config.dto';

@Injectable()
export class FindingService {
  private logger = new Logger('FindingService');

  constructor(private readonly httpService: HttpService, private readonly ebayItemService: EbayItemService) {}

  async apiRequest(pageNumber): Promise<FindCompletedItemsResponse> {
    const url = 'https://svcs.ebay.com/services/search/FindingService/v1';
    const params: FindCompletedItemsConfig = {
      'OPERATION-NAME': 'findCompletedItems',
      'SERVICE-VERSION': '1.13.0',
      'SECURITY-APPNAME': process.env.EBAY_API_APPID,
      'RESPONSE-DATA-FORMAT': 'JSON',
      'REST-PAYLOAD': null,
      categoryId: 63,
      buyerPostalCode: 10036,
      'itemFilter(0).name': 'SoldItemsOnly',
      'itemFilter(0).value': true,
      'paginationInput.pageNumber': pageNumber,
    };

    try {
      const response = await this.httpService.get(url, { params }).toPromise();
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getCompletedItems() {
    try {
      // Call the above function ONCE to return the intial payload
      const initialResults = await this.apiRequest(1);

      // Store the values temporarily
      let items = initialResults.findCompletedItemsResponse[0].searchResult[0].item;

      // We extract the current page number and the MAX page number
      const totalPages = parseInt(initialResults.findCompletedItemsResponse[0].paginationOutput[0].totalPages[0]);

      // Get the data from the remaining pages
      if (totalPages > 1) {
        for (let i = 2; i <= 10; i++) {
          // artificial limit to prevent being blocked by ebay api
          const results = await this.apiRequest(i);
          items = items.concat(results.findCompletedItemsResponse[0].searchResult[0].item);
        }
      }

      // Store the data in the database
      for (let i = 0; i < items.length; i++) {
        // this.logger.log(items[i].itemId[0]);
        await this.ebayItemService.createEbayItem(items[i]);
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
