//GetByID
//Search

import { Logger, Get, Param } from "@nestjs/common";
import { ComicService } from "./comic.service";
import { ComicDto } from "./dto/comic.dto";

export class ComicController {
    private logger = new Logger('ComicController');

    constructor(private readonly comicService: ComicService){}

    @Get('/:id')
    getComicByIssueId(@Param('id') id: number): Promise<ComicDto> {
        return this.comicService.getComicByIssueId(id);
    }
}