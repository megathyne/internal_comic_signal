import { Controller, Logger, Get } from '@nestjs/common';
import { EbayItemService } from './ebay-item.service';
import { Item } from 'src/finding/dto/FindCompletedItemsResponse.dto';

@Controller('ebay-item')
export class EbayItemController {
  private logger = new Logger('EbayItemController');

  constructor(private readonly ebayItemService: EbayItemService) {}

  @Get()
  get() {
    const data: Item = {
      itemId: ['233484176985'],
      title: ['Spawn 297/298/299/300/301 Set NM McFarlane Image J. Scott Campbell B&W Variant'],
      globalId: ['EBAY-US'],
      primaryCategory: [{ categoryId: ['17079'], categoryName: ['Spawn'] }],
      galleryURL: ['https://thumbs3.ebaystatic.com/m/mNWBc4i3oLF5eCNnJA1mNBQ/140.jpg'],
      viewItemURL: [
        'https://www.ebay.com/itm/Spawn-297-298-299-300-301-Set-NM-McFarlane-Image-J-Scott-Campbell-B-W-Variant-/233484176982',
      ],
      paymentMethod: ['PayPal'],
      autoPay: ['true'],
      postalCode: ['481**'],
      location: ['Ann Arbor,MI,USA'],
      country: ['US'],
      condition: [{ conditionId: ['foo'], conditionDisplayName: ['foo'] }],
      shippingInfo: [
        {
          shippingServiceCost: [{ '@currencyId': 'USD', __value__: '0.0' }],
          shippingType: ['Free'],
          shipToLocations: ['Worldwide'],
          expeditedShipping: ['false'],
          oneDayShippingAvailable: ['false'],
          handlingTime: ['3'],
        },
      ],
      sellingStatus: [
        {
          currentPrice: [{ '@currencyId': 'USD', __value__: '17.99' }],
          convertedCurrentPrice: [{ '@currencyId': 'USD', __value__: '17.99' }],
          sellingState: ['EndedWithSales'],
          bidCount: ['0'],
        },
      ],
      listingInfo: [
        {
          bestOfferEnabled: ['true'],
          buyItNowAvailable: ['false'],
          startTime: ['2020-02-03T06:27:37.000Z'],
          endTime: ['2020-02-23T02:13:22.000Z'],
          listingType: ['FixedPrice'],
          gift: ['false'],
          watchCount: ['0'],
        },
      ],
      returnsAccepted: ['false'],
      isMultiVariationListing: ['false'],
      topRatedListing: ['false'],
    };

    this.logger.log(`Retrieving and starting process to add to EBI Repository`);
    return this.ebayItemService.createEbayItem(data);
  }
}
