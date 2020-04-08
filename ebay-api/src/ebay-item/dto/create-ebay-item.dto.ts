export class CreateEbayItemDto {
  itemId: string;

  title: string;

  globalId: string;

  galleryURL: string;

  viewItemURL: string;

  primaryCategoryId: string;

  finalPrice: number;

  location: string;

  country: string;

  shippingCost: number;

  totalCost: number;

  listingType: string;

  endTime: Date;

  bestOfferEnabled: boolean;
}
