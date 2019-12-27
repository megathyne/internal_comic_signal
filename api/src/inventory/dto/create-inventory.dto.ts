import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiModelProperty()
  readonly bin: number;

  @ApiModelProperty()
  readonly tag: number;

  @ApiModelProperty()
  readonly comicId: number;

  @ApiModelProperty()
  readonly cost: number;

  @ApiModelProperty({type: 'string', format: 'date'})
  readonly aquired: Date;

  @ApiModelPropertyOptional()
  readonly notes: string;
}
