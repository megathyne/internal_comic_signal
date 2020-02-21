export class PaginationOutput {
  'pageNumber': string;
  'entriesPerPage': string;
  'totalPages': string;
  'totalEntries': string;
}

export class PrimaryCategory {
  'categoryId': string;
  'categoryName': string;
}

export class ProductId {
  'type': string;
  '#text': string;
}

export class ShippingServiceCost {
  'currencyId': string;
  '#text': string;
}

export class ShippingInfo {
  'shippingServiceCost': ShippingServiceCost;
  'shippingType': string;
  'expeditedShipping': string;
  'oneDayShippingAvailable': string;
  'handlingTime': string;
  'shipToLocations': string;
}

export class CurrentPrice {
  'currencyId': string;
  '#text': string;
}

export class ConvertedCurrentPrice {
  'currencyId': string;
  '#text': string;
}

export class SellingStatus {
  'currentPrice': CurrentPrice;
  'convertedCurrentPrice': ConvertedCurrentPrice;
  'bidCount': string;
  'sellingState': string;
}

export class ListingInfo {
  'bestOfferEnabled': string;
  'buyItNowAvailable': string;
  'startTime': Date;
  'endTime': Date;
  'listingType': string;
  'gift': string;
}

export class Condition {
  'conditionId': string;
  'conditionDisplayName': string;
}

export class Item {
  'itemId': string;
  'title': string;
  'globalId': string;
  'primaryCategory': PrimaryCategory;
  'galleryURL': string;
  'viewItemURL': string;
  'productId': ProductId;
  'paymentMethod': string;
  'autoPay': string;
  'postalCode': string;
  'location': string;
  'country': string;
  'shippingInfo': ShippingInfo;
  'sellingStatus': SellingStatus;
  'listingInfo': ListingInfo;
  'returnsAccepted': string;
  'condition': Condition;
  'isMultiVariationListing': 'false';
}

export class SearchResult {
  'count': string;
  'item': Item[];
  'paginationOutput': PaginationOutput;
}

export class findCompletedItemsResponse {
  'xmlns': string;
  'ack': string;
  'version': string;
  'timestamp': Date;
  'searchResult': SearchResult;
}
