import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IssueRepository } from "./issue.repository";
import { ComicService } from "./comic.service";
import { ComicController } from "./comic.controller";
import { SeriesRepository } from "./series.repository";
import { CoverModule } from "src/cover/cover.module";

@Module({
    imports: [TypeOrmModule.forFeature([IssueRepository]), TypeOrmModule.forFeature([SeriesRepository]), CoverModule],
    providers: [ComicService],
    controllers: [ComicController],
    exports: [ComicService],
})
export class ComicModule{}