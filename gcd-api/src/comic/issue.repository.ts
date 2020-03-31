//GET ID BY ISSUE
// SEARCH FOR ISSUE AND "MERGE" WITH SERIES
// EX: INVENTORY WITH GRADE ID
// RETURNS A COMIC

import { EntityRepository, Repository, getManager } from "typeorm";
import { Logger } from "@nestjs/common";
import { Issue } from "./issue.entity";

@EntityRepository(Issue)
export class IssueRepository extends Repository<Issue> {
    private logger = new Logger('ComicRepository');

    async getComicByIssueId(id: number): Promise<Issue>{
        return await this.findOne(id);
    }
    
}