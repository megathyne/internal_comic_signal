import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IssueRepository } from "./issue.repository";
import { ComicService } from "./comic.service";
import { ComicController } from "./comic.controller";
import { SeriesRepository } from "./series.repository";

@Module({
    imports: [TypeOrmModule.forFeature([IssueRepository]), TypeOrmModule.forFeature([SeriesRepository])],
    providers: [ComicService],
    controllers: [ComicController],
    exports: [ComicService],
})
export class ComicModule{}