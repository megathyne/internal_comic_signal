import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateInventoryDto {
  @ApiModelPropertyOptional()
  readonly bin: number;

  @ApiModelPropertyOptional()
  readonly tag: number;

  @ApiModelPropertyOptional()
  readonly cost: number;

  @ApiModelPropertyOptional({ type: 'string', format: 'date' })
  readonly aquired: Date;

  @ApiModelPropertyOptional()
  readonly notes: string;
}
