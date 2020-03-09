import { Injectable, Logger, HttpService } from "@nestjs/common";
import { EbayItemService } from "src/ebay-item/ebay-item.service";

@Injectable()
export class SeederService {
    private logger = new Logger('SeederService');

    constructor (private readonly httpService: HttpService, private readonly ebayItemService: EbayItemService) {}

}