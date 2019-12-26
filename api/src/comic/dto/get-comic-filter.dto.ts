import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetComicFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}