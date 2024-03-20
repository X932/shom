import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { ROUTES } from '@constants/routes';
import { InventoryService } from './inventory.service';
import { GetInventoryDto } from './models/inventory.dto';

@UseGuards(JwtAuthGuard)
@Controller(ROUTES.INVENTORY)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getList(@Query() getInventoryDto: GetInventoryDto) {
    return this.inventoryService.getList(getInventoryDto);
  }
}
