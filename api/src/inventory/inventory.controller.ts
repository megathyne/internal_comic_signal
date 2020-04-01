import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Logger,
  UseGuards,
  Patch,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './inventory.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { GetInventoryFilterDto } from './dto/get-inventory-filter.dto';

@ApiUseTags('inventory')
@ApiBearerAuth()
@Controller('inventory')
@UseGuards(AuthGuard('jwt'))
export class InventoryController {
  private logger = new Logger('InventoryController');

  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  get(@Query() filterDto: GetInventoryFilterDto, @GetUser() user: User) {
    this.logger.verbose(`User "${user.username}" retrieving inventory. Filters: ${JSON.stringify(filterDto)}`);
    return this.inventoryService.getInventory(filterDto, user);
  }

  @Get('comic')
  getPortfolioItem(@Query() data, @GetUser() user: User) {
    const comics = data.list.split(',');
    return this.inventoryService.getPortfolioItem(comics, user);
  }

  @Get('portfolio')
  getPortfolio(@GetUser() user: User) {
    this.logger.verbose(`User "${user.username}" retrieving portfolio.`);
    return this.inventoryService.getPortfolio(user);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  getInventoryById(@Param('id') id: number, @GetUser() user: User): Promise<Inventory> {
    return this.inventoryService.getInventoryById(id, user);
  }

  @Post()
  post(@Body() createInventoryDto: CreateInventoryDto, @GetUser() user: User): Promise<Inventory> {
    this.logger.verbose(`Creating inventory for UserId: ${user.id}. DTO: ${JSON.stringify(createInventoryDto)}`);
    return this.inventoryService.postInventory(createInventoryDto, user);
  }

  @Patch('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  patch(
    @Param('id') id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
    @GetUser() user: User,
  ): Promise<Inventory> {
    this.logger.verbose(`Updating inventory for UserId: ${user.id}. DTO: ${JSON.stringify(updateInventoryDto)}`);
    return this.inventoryService.patchInventory(id, updateInventoryDto, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`Deleting inventory for UserId: ${user.id}. InventoryId: ${id}`);
    return this.inventoryService.deleteInventory(id, user);
  }
}
