import { IsNotEmpty } from 'class-validator';

export class GetEbayItemFilterDto {
  @IsNotEmpty()
  series: string;

  @IsNotEmpty()
  issue: number;

  @IsNotEmpty()
  excludingIds: number[];
}
