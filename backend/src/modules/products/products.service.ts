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

    try {
      const isProductExist =
        (
          await this.find({
            title: product.title,
          })
        ).length > 0;

      if (isProductExist) {
        throw new BadRequestException();
      }

      const newProductPrices: ProductsPricesEntity[] = [];
      const newProductDetails: ProductsDetailsEntity[] = [];

      product.details.forEach((detail) => {
        const newPrice = new ProductsPricesEntity();
        newPrice.amount = detail.price.amount;
        newProductPrices.push(newPrice);

        const newDetails = new ProductsDetailsEntity();
        newDetails.size = detail.size;
        newDetails.price = newPrice;
        newProductDetails.push(newDetails);
      });

      const newProduct = new ProductsEntity();
      newProduct.title = product.title;
      newProduct.imgPath = product.imgPath;
      newProduct.description = product.description;
      newProduct.details = newProductDetails;

      await queryRunner.manager.save<ProductsPricesEntity>(newProductPrices);
      await queryRunner.manager.save<ProductsDetailsEntity>(newProductDetails);
      await queryRunner.manager.save<ProductsEntity>(newProduct);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }

  public async find(params?: Partial<BaseProduct>): Promise<ProductsEntity[]> {
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

    try {
      const isProductExist = (await this.find({ id: product.id })).length > 0;
      if (!isProductExist) {
        throw new BadRequestException();
      }

      const newProductDetails: ProductsDetailsEntity[] = [];
      const newProductPrices: ProductsPricesEntity[] = [];

      product.details.forEach((detail) => {
        const newPrice = new ProductsPricesEntity();
        newPrice.id = detail.price.id;
        newPrice.amount = detail.price.amount;
        newProductPrices.push(newPrice);

        const newDetails = new ProductsDetailsEntity();
        newDetails.id = detail.id;
        newDetails.size = detail.size;
        newDetails.price = newPrice;
        newProductDetails.push(newDetails);
      });

      await queryRunner.manager.save<ProductsPricesEntity>(newProductPrices);
      await queryRunner.manager.save<ProductsDetailsEntity>(newProductDetails);

      const newProduct = new ProductsEntity();
      newProduct.id = product.id;
      newProduct.title = product.title;
      newProduct.imgPath = product.imgPath;
      newProduct.description = product.description;
      newProduct.details = newProductDetails;
      await queryRunner.manager.save<ProductsEntity>(newProduct);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }

  public async delete(params?: Partial<BaseProduct>) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product: ProductsEntity = (await this.find({ id: params.id }))[0];

      if (!product) {
        throw new BadRequestException();
      }

      await queryRunner.manager.delete(ProductsEntity, {
        id: params.id,
      });

      await queryRunner.manager.delete(ProductsDetailsEntity, product.details);

      const prices = product.details.map(
        (productDetail) => productDetail.price,
      );
      await queryRunner.manager.delete(ProductsPricesEntity, prices);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }
}
