import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductsDetailsEntity } from './models/products-details.entity';
import { ProductsPricesEntity } from './models/products-prices.entity';
import { CreateProductDto } from './models/products.dto';
import { ProductsEntity } from './models/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
    private dataSource: DataSource,
  ) {}

  public async create(product: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const newProduct = new ProductsEntity();
    newProduct.title = product.title;
    newProduct.imgPath = product.imgPath;

    try {
      const oldProduct = await this.productsRepository.findOne({
        where: { title: newProduct.title },
      });

      const newProductDetails = new ProductsDetailsEntity();
      newProductDetails.size = product.size;
      newProductDetails.description = product.description;
      const savedProductDetails =
        await queryRunner.manager.save<ProductsDetailsEntity>(
          newProductDetails,
        );

      if (oldProduct) {
        newProduct.id = oldProduct.id;

        if (oldProduct.details) {
          newProduct.details = [...oldProduct.details, savedProductDetails];
        } else {
          newProduct.details = [savedProductDetails];
        }
      } else {
        newProduct.details = [savedProductDetails];
      }

      const savedProduct = await queryRunner.manager.save<ProductsEntity>(
        newProduct,
      );

      const newProductPrice = new ProductsPricesEntity();
      newProductPrice.price = product.price;
      newProductPrice.product = [savedProduct];
      newProductPrice.productDetails = savedProductDetails;
      await queryRunner.manager.save<ProductsPricesEntity>(newProductPrice);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }

  public async find(id?: number): Promise<ProductsEntity[]> {
    return await this.productsRepository.find({
      where: { id: id },
      relations: {
        details: true,
        price: true,
      },
    });
  }
}
