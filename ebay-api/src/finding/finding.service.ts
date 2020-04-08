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

  async apiRequest(pageNumber): Promise<any> {
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
      this.logger.error(`Error making api request to ebay. Params: ${JSON.stringify(params)}`, error);
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
      this.logger.log(`Processing starting for page 1`);
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
      this.logger.log(`Processing completed for page 1 of ${totalPages}`);

      for (let i = initialPage + 1; i <= totalPages; i++) {
        await this.delay(4000); // Artifical Delays

        this.logger.log(`Processing starting for page ${i} of ${totalPages}`);

        const results = await this.apiRequest(i);

        if (results.findCompletedItemsResponse[0].ack[0] !== 'Success') {
          // Usually this error occurs when the postal code we send doesnt work
          // TODO: Retry the page without the buyerPostalCode: 10036 property on the config in place
          this.logger.log(JSON.stringify(results.findCompletedItemsResponse[0].errorMessage));
        } else {
          await this.storeBatch(results.findCompletedItemsResponse[0].searchResult[0].item);
          this.logger.log(`Processing completed for page ${i} of ${totalPages}`);
        }
      }
    } catch (error) {
      this.logger.error('Error in getCompletedItem: ', error);
    }
  }
}
