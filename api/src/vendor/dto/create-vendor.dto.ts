import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateVendorDto {
  @ApiModelProperty({ example: 'eBay' })
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ example: 'acomicstore' })
  readonly subvendor: string;
}
