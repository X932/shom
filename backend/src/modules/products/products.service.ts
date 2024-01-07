import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseProduct } from './models/products.type';
import { ProductsDetailsEntity } from './models/products-details.entity';
import { ProductsPricesEntity } from './models/products-prices.entity';
import { CreateProductDto, UpdateProductDto } from './models/products.dto';
import { ProductsEntity } from './models/products.entity';
import { InventoryEntity } from '../inventory/models/inventory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
    private readonly dataSource: DataSource,
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

      const newProduct = new ProductsEntity();
      newProduct.title = product.title;
      newProduct.imgPath = product.imgPath;
      newProduct.description = product.description;
      const createdProduct = await queryRunner.manager.save<ProductsEntity>(
        newProduct,
      );

      const newProductPrices: ProductsPricesEntity[] = [];
      const newProductDetails: ProductsDetailsEntity[] = [];

      product.details.forEach((productDetails) => {
        const newPrice = new ProductsPricesEntity();
        newPrice.amount = productDetails.price.amount;
        newProductPrices.push(newPrice);

        const newDetails = new ProductsDetailsEntity();
        newDetails.size = productDetails.size;
        newDetails.price = newPrice;

        const newInventory = new InventoryEntity();
        newInventory.product = createdProduct;
        newInventory.quantity = productDetails.quantity;

        newDetails.inventory = newInventory;
        newProductDetails.push(newDetails);
      });
      await queryRunner.manager.save<ProductsPricesEntity>(newProductPrices);
      await queryRunner.manager.save<ProductsDetailsEntity>(newProductDetails);

      createdProduct.details = newProductDetails;
      await queryRunner.manager.save<ProductsEntity>(createdProduct);

      await queryRunner.commitTransaction();
    } catch {
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
          inventory: true,
        },
      },
    });
  }

  public async findOne(id: number): Promise<ProductsEntity> {
    return await this.productsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        details: {
          price: true,
          inventory: true,
        },
      },
    });
  }

  public async update(product: UpdateProductDto) {
    try {
      await this.productsRepository.save({
        id: product.id,
        title: product.title,
        description: product.description,
        imgPath: product.imgPath,
        details: product.details,
        inventories: product.details.map(({ inventory }) => inventory),
      });
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  public async delete(id: number) {
    const product = await this.productsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        inventories: true,
        details: {
          price: true,
        },
      },
    });

    await this.productsRepository.softRemove(product);
  }
}
