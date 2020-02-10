import { IsOptional, IsNotEmpty } from "class-validator";

export class GetIssueFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}