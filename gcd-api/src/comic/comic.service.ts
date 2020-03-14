//FUNCTIONS

import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ComicRepository } from "./comic.repository";
import { ComicDto } from "./dto/comic.dto";
import { Issue } from "./issue.entity";

@Injectable()
export class ComicService {
    private logger = new Logger('ComicService');

    constructor(
        @InjectRepository(ComicRepository)
        private comicRepository: ComicRepository,
    ) {}

    async getComicByIssueId(id: number): Promise<ComicDto> {
        try{
            const found = await this.comicRepository.getComicByIssueId(id);

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