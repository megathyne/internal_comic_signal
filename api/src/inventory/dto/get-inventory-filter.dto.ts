import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetInventoryFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}