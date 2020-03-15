//GetByID
//Search

import { Logger, Get, Param, Controller } from "@nestjs/common";
import { ComicService } from "./comic.service";
import { ComicDto } from "./dto/comic.dto";

@Controller('comic')
export class ComicController {
    private logger = new Logger('ComicController');

    constructor(private readonly comicService: ComicService){}

    @Get('/:id')
    getComicByIssueId(@Param('id') id: string): Promise<ComicDto> {
        return this.comicService.getComicByIssueId(parseInt(id));
    }
}