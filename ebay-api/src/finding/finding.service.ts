import { Injectable, Logger, HttpService } from '@nestjs/common';
import { FindCompletedItemsResponse, Item } from './dto/findCompletedItemsResponse.dto';
import { EbayItemService } from '../ebay-item/ebay-item.service';
import { FindCompletedItemsConfig } from '../finding/dto/find-completed-items-config.dto';

@Injectable()
export class FindingService {
  private logger = new Logger('FindingService');

  constructor(private readonly httpService: HttpService, private readonly ebayItemService: EbayItemService) {}

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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
      this.logger.error(`Error making api request to ebay. Params: ${params}`, error);
    }
  }

  async storeBatch(items: Item[]): Promise<void> {
    try {
      for (let i = 0; i < items.length; i++) {
        await this.ebayItemService.createEbayItem(items[i]);
      }
    } catch (error) {
      this.logger.error('Error trying to store completed items ', error);
    }
  }

  async getCompletedItems() {
    try {
      let initialPage = 1;

      // Call the above function ONCE to return the intial payload
      const initialResults = await this.apiRequest(initialPage);

      // Store the values temporarily
      let items = initialResults.findCompletedItemsResponse[0].searchResult[0].item;

      if (items.length > 0) {
        await this.storeBatch(items);
      } else {
        return 'success';
      }

      // We extract the current page number and the MAX page number
      const totalPages = parseInt(initialResults.findCompletedItemsResponse[0].paginationOutput[0].totalPages[0]);

      for (let i = initialPage + 1; i <= totalPages; i++) {
        await this.delay(3000); // Artifical Delays
        const results = await this.apiRequest(i);
        items = results.findCompletedItemsResponse[0].searchResult[0].item;
        await this.storeBatch(items);
      }
    } catch (error) {
      this.logger.error('Error in getCompletedItem: ', error);
    } 
  }
}
