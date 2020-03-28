import { IsNotEmpty } from "class-validator";

export class GetGcdItemFilterDto {
    @IsNotEmpty()
    series: string;

    @IsNotEmpty()
    issue: number;
}