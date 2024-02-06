import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsDetailsEntity } from './models/products-details.entity';

@Injectable()
export class ProductsDetailsService {
  constructor(
    @InjectRepository(ProductsDetailsEntity)
    private readonly productDetailsRepository: Repository<ProductsDetailsEntity>,
  ) {}

  public async getById(id: number): Promise<ProductsDetailsEntity> {
    return await this.productDetailsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        products: true,
        price: true,
        inventory: true,
      },
    });
  }
}
