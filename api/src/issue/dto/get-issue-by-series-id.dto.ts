import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetSeriesByIssueIdDto {
  @IsNotEmpty()
  seriesId: number;
}
