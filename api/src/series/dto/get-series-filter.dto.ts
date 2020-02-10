import { IsOptional, IsNotEmpty } from "class-validator";

export class GetSeriesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}