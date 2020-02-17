import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @ApiModelProperty({ example: 1 })
  readonly bin: number;

  @ApiModelProperty({ example: 123 })
  readonly tag: number;

  @ApiModelProperty({ example: '3F45DF3YU55V' })
  readonly serial: number;

  @ApiModelProperty({ example: 1 })
  @IsNotEmpty()
  readonly issueId: number;

  @ApiModelPropertyOptional({ example: 1 })
  readonly conditionId: number;

  @ApiModelPropertyOptional({ example: 1 })
  readonly graderId: number;

  @ApiModelPropertyOptional({ example: 1 })
  readonly pageId: number;

  @ApiModelProperty({ example: 1 })
  @IsNotEmpty()
  readonly vendorId: number;

  @ApiModelProperty({ example: 12.5 })
  @IsNotEmpty()
  readonly cost: number;

  @ApiModelProperty({ example: 12.5 })
  readonly value: number;

  @ApiModelProperty({ type: 'string', format: 'date' })
  @IsNotEmpty()
  readonly aquired: Date;

  @ApiModelPropertyOptional({ example: 'my note' })
  @IsNotEmpty()
  readonly notes: string;
}
