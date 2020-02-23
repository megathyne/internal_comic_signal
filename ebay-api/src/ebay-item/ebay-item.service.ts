import { Injectable } from '@nestjs/common';

@Injectable()
export class EbayItemService {
  data = {
    itemId: ['233484176982'],
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
      },
    ],
    returnsAccepted: ['false'],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false'],
  };
  mappedData = {
    itemId: this.data.itemId[0],
    title: this.data.title[0],
    
  };
}
