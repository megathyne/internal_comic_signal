import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeriesRepository } from "./series.repository";
import { SeriesService } from "./series.service";
import { SeriesController } from "./series.controller";


@Module({
  imports: [TypeOrmModule.forFeature([SeriesRepository])],
  providers: [SeriesService],
  controllers: [SeriesController],
})
export class SeriesModule {}