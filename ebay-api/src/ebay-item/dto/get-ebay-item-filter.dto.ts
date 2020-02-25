import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetEbayItemFilterDto {
  @IsOptional()
  @IsNotEmpty()
  series: string;

  @IsOptional()
  @IsNotEmpty()
  issue: string;

}
