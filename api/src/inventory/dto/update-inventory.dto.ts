import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
  @ApiModelProperty()
  readonly bin: number;

  @ApiModelProperty()
  readonly comic: number;

  @ApiModelProperty()
  readonly quantity: number;
}
