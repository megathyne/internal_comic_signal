import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetEbayItemFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
