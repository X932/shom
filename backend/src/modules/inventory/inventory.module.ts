import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryEntity } from './models/inventory.entity';

@Module({
  providers: [InventoryService],
  controllers: [InventoryController],
  imports: [TypeOrmModule.forFeature([InventoryEntity])],
})
export class InventoryModule {}
