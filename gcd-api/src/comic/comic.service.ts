//FUNCTIONS

import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository, InjectEntityManager } from "@nestjs/typeorm";
import { IssueRepository } from "./issue.repository";
import { ComicDto } from "./dto/comic.dto";

@Injectable()
export class ComicService {
    private logger = new Logger('ComicService');

    constructor(
        @InjectRepository(IssueRepository)
        private issueRepository: IssueRepository        
    ) {}

    async getComicByIssueId(id: number): Promise<ComicDto> {
        try{
            const found = await this.issueRepository.getComicByIssueId(id);

            if(!found){
                this.logger.error(`Issue with ID "${id}" not found`);
                throw new NotFoundException(`Issue with ID "${id}" not found`);
            }
            return found;
        } catch(error) {
            this.logger.error(error);
        }
    }
}