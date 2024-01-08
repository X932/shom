import { IDataList } from '@common-types/data-list';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetInventoryDto } from './models/inventory.dto';
import { InventoryEntity } from './models/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}

  public async getList(
    getInventoryDto: GetInventoryDto,
  ): Promise<IDataList<InventoryEntity>> {
    const { rowsLimit, rowsOffset } = getInventoryDto;
    const [list, totalCount] = await this.inventoryRepository.findAndCount({
      relations: {
        product: true,
        productsDetails: {
          price: true,
        },
      },
      take: rowsLimit,
      skip: rowsOffset * rowsLimit || 0,
    });

    return { data: list, totalCount: totalCount };
  }
}
