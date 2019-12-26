import { ApiModelProperty } from '@nestjs/swagger';

export class CreateComicDto {
  @ApiModelProperty()
  readonly series: string;

  @ApiModelProperty()
  readonly volume: number;

  @ApiModelProperty()
  readonly issue: number;
}
