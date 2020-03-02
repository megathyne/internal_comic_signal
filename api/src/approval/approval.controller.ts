import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Logger, Get, Post, Body, Query, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Approval } from './approval.entity';
import { ApprovalService } from './approval.service';
import { CreateApprovalDto } from './dto/create-approval.dto';
import { GetEbayItemResponseDto } from 'src/ebay-api/dto/get-ebay-item-response.dto';

@ApiUseTags('approval')
@ApiBearerAuth()
@Controller('approval')
@UseGuards(AuthGuard('jwt'))
export class ApprovalController {
  private logger = new Logger('ApprovalController');

  constructor(private readonly approvalService: ApprovalService) {}

  // @Get()
  // get(@GetUser() user: User): Promise<Approval[]> {
  //   this.logger.verbose(`User "${user.username}" retrieving all ebay data matching inventory`);
  //   return this.approvalService.getApproval();
  // }

  @Get('pending/:inventoryId')
  getPending(@Param('inventoryId') inventoryId: string, @GetUser() user: User): Promise<GetEbayItemResponseDto[]> {
    let parsedInventoryId = parseInt(inventoryId); // needs to be replaced with a pipe

    this.logger.verbose(`UserId: ${user.id} Requesting pending approvals for InventoryId: ${inventoryId}`);
    return this.approvalService.getPending(parsedInventoryId, user);
  }

  @Post()
  post(@Body() createApprovalDto: CreateApprovalDto, @GetUser() user: User): Promise<Approval> {
    this.logger.verbose(`User "${user.username}" posting new approval`);
    return this.approvalService.createApproval(createApprovalDto, user);
  }
}
