import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseProduct } from './models/products.type';
import { ProductsDetailsEntity } from './models/products-details.entity';
import { ProductsPricesEntity } from './models/products-prices.entity';
import { CreateProductDto, UpdateProductDto } from './models/products.dto';
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
    newProduct.description = product.description;

    try {
      const oldProduct: ProductsEntity = (
        await this.find({
          title: newProduct.title,
        })
      )[0];

      const newProductPrice = new ProductsPricesEntity();
      newProductPrice.amount = product.price;
      const savedProductPrice =
        await queryRunner.manager.save<ProductsPricesEntity>(newProductPrice);

      const newProductDetails = new ProductsDetailsEntity();
      newProductDetails.size = product.size;
      newProductDetails.price = savedProductPrice;
      const savedProductDetails =
        await queryRunner.manager.save<ProductsDetailsEntity>(
          newProductDetails,
        );

      if (oldProduct) {
        newProduct.id = oldProduct.id;

        if (oldProduct.details?.length > 0) {
          newProduct.details = [...oldProduct.details, savedProductDetails];
        } else {
          newProduct.details = [savedProductDetails];
        }
      } else {
        newProduct.details = [savedProductDetails];
      }

      await queryRunner.manager.save<ProductsEntity>(newProduct);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }

  public async find(
    params?: Partial<BaseProduct>,
  ): Promise<ProductsEntity | ProductsEntity[]> {
    return await this.productsRepository.find({
      where: {
        id: params?.id,
        title: params?.title,
      },
      relations: {
        details: {
          price: true,
        },
      },
    });
  }

  public async update(product: UpdateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // before save check for existing

    try {
      const newProduct = new ProductsEntity();
      newProduct.id = product.id;
      newProduct.title = product.title;
      newProduct.imgPath = product.imgPath;
      newProduct.description = product.description;
      await queryRunner.manager.save<ProductsEntity>(newProduct);

      const newProductsDetails = product.details.map((detail) => {
        const newDetail = new ProductsDetailsEntity();
        newDetail.id = detail.id;
        newDetail.size = detail.size;
        newDetail.price = detail.price;
        newDetail.product = newProduct;
        return newDetail;
      });
      await queryRunner.manager.save<ProductsDetailsEntity>(newProductsDetails);

      const newProductsPrices = product.details.map((detail) => {
        const newPrice = new ProductsPricesEntity();
        newPrice.id = detail.price.id;
        newPrice.amount = detail.price.amount;
        return newPrice;
      });
      await queryRunner.manager.save<ProductsPricesEntity>(newProductsPrices);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }
}
