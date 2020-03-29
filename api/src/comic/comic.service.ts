import { Injectable, Logger } from "@nestjs/common";
import { GcdApiService } from "../gcd-api/gcd-api.service";
import { InventoryService } from "../inventory/inventory.service";
import { User } from "../auth/user.entity";
import { GetGcdItemResponseDto } from "../gcd-api/dto/get-gcd-item-response.dto";
import { GetGcdItemFilterDto } from "src/gcd-api/dto/get-gcd-item-filter.dto";

@Injectable()
export class ComicService{
    private logger = new Logger('ComicService');

    constructor(
        private gcdApiService: GcdApiService,
        //private inventoryService: InventoryService,            
     ) {}
    
     async getComicResults(getGcdItemFilter: GetGcdItemFilterDto,user: User): Promise<GetGcdItemResponseDto[]> {
        try{
            const results = await this.gcdApiService.get(getGcdItemFilter, user);
            return results;

        }catch(error) {
            this.logger.error(error);
        }
     }
}