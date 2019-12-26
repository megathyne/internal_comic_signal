import { ApiModelProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiModelProperty()
  readonly bin: number;

  @ApiModelProperty()
  readonly comicId: number;

  @ApiModelProperty()
  readonly quantity: number;
}
