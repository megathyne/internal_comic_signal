import { ApiModelProperty } from '@nestjs/swagger';

export class CreateApprovalDto {
  @ApiModelProperty({ example: 1 })
  readonly inventoryId: number;

  @ApiModelProperty({ example: 1 })
  readonly ebayItemId: number;

  @ApiModelProperty({ example: 1 })
  readonly isApproved: boolean;
}
