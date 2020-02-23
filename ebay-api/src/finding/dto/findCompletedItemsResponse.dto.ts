export class PaginationOutput {
  'pageNumber': string[];
  'entriesPerPage': string[];
  'totalPages': string[];
  'totalEntries': string[];
}

export class PrimaryCategory {
  'categoryId': string[];
  'categoryName': string[];
}

export class Cost {
  '@currencyId': string;
  '__value__': string;
}

export class ShippingInfo {
  'shippingServiceCost': Cost[];
  'shippingType': string[];
  'shipToLocations': string[];
  'expeditedShipping': string[];
  'oneDayShippingAvailable': string[];
  'handlingTime': string[];
}

export class SellingStatus {
  'currentPrice': Cost[];
  'convertedCurrentPrice': Cost[];
  'bidCount': string[];
  'sellingState': string[];
}

export class ListingInfo {
  'bestOfferEnabled': string[];
  'buyItNowAvailable': string[];
  'startTime': string[];
  'endTime': string[];
  'listingType': string[];
  'gift': string[];
  'watchCount': string[];
}

export class Condition {
  'conditionId': string[];
  'conditionDisplayName': string[];
}

export class Item {
  'itemId': string[];
  'title': string[];
  'globalId': string[];
  'primaryCategory': PrimaryCategory[];
  'galleryURL': string[];
  'viewItemURL': string[];
  'paymentMethod': string[];
  'autoPay': string[];
  'postalCode': string[];
  'location': string[];
  'country': string[];
  'shippingInfo': ShippingInfo[];
  'sellingStatus': SellingStatus[];
  'listingInfo': ListingInfo[];
  'returnsAccepted': string[];
  'condition': Condition[];
  'isMultiVariationListing': string[];
  'topRatedListing': string[];
}

export class SearchResult {
  '@count': string[];
  'item': Item[];
}

export class FindCompletedItem {
  'ack': string[];
  'version': string[];
  'timestamp': string[];
  'searchResult': SearchResult[];
  'paginationOutput': PaginationOutput[];
}

export class FindCompletedItemsResponse {
  'findCompletedItemsResponse': FindCompletedItem[];
}
