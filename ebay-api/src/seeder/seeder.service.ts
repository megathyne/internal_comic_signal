import { Injectable, Logger, HttpService } from "@nestjs/common";
import { FindingService } from "src/finding/finding.service";

@Injectable()
export class SeederService {
    private logger = new Logger('SeederService');

    constructor (private readonly findingService: FindingService, private readonly httpService: HttpService) {}

    async seedEbayItems() {
        await this.findingService.getCompletedItems()
        .then(completed => {this.logger.debug('Inserted ebay data into database!');
            Promise.resolve(completed);
            })
        .catch(error => {
            this.logger.error('Failed to seed ebay data!');
            Promise.reject(error);
        })
    }

}