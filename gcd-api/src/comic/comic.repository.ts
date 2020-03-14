//GET ID BY ISSUE
// SEARCH FOR ISSUE AND "MERGE" WITH SERIES
// EX: INVENTORY WITH GRADE ID
// RETURNS A COMIC

import { EntityRepository, Repository, getManager } from "typeorm";
import { ComicDto } from "./dto/comic.dto";
import { Logger } from "@nestjs/common";

@EntityRepository(ComicDto)
export class ComicRepository extends Repository<ComicDto> {
    private logger = new Logger('ComicRepository');

    async getComicByIssueId(id: number): Promise<any>{
        
        const query = this.createQueryBuilder('issue')
        .innerJoinAndSelect('issue.id', 'id')
        .where('issue.id = :id', {id: id})
        .getOne();
        

        // const query = this.createQueryBuilder('issue');
        // query.innerJoinAndSelect('series.name', 'series_name');
        // query.innerJoinAndSelect('issue.number', 'issue_number');
        
        // if(id) {
        //     query.where(
        //         'issue.id = :search', { search: `%${id}%`},
        //     );
        // }
        // try{
        //     const comic = await query.getQuery();
        //     return comic;
        // }

    }

}