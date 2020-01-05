import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly bin: number;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly tag: number;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly comicId: number;

  @ApiModelProperty()
  readonly gradeId: number;

  @ApiModelProperty()
  readonly vendorId: number;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly cost: number;

  @ApiModelProperty({ type: 'string', format: 'date' })
  @IsNotEmpty()
  readonly aquired: Date;

  @ApiModelPropertyOptional()
  @IsNotEmpty()
  readonly notes: string;
}
