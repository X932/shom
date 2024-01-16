import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseProduct } from './models/products.type';
import { ProductsDetailsEntity } from './models/products-details.entity';
import { ProductsPricesEntity } from './models/products-prices.entity';
import { CreateProductDto, UpdateProductDto } from './models/products.dto';
import { ProductsEntity } from './models/products.entity';
import { InventoryEntity } from '../inventory/models/inventory.entity';
import { BranchesEntity } from '../branches/models/branches.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async create(product: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

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
        newInventory.branch = new BranchesEntity();
        newInventory.branch.id = productDetails.branchId;

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
          inventory: {
            branch: true,
          },
        },
      },
    });
  }

  public async update(updateProductDto: UpdateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    const isProductExist =
      (
        await this.find({
          id: updateProductDto.id,
        })
      ).length > 0;

    if (!isProductExist) {
      throw new NotFoundException('Продукт не найден');
    }

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const product = new ProductsEntity();
      product.id = updateProductDto.id;
      product.title = updateProductDto.title;
      product.imgPath = updateProductDto.imgPath;
      product.description = updateProductDto.description;

      const newProductDetails: ProductsDetailsEntity[] =
        updateProductDto.details.map((productDetails) => {
          const newDetails = new ProductsDetailsEntity();
          newDetails.product = product;
          newDetails.id = productDetails.id;
          newDetails.size = productDetails.size;

          newDetails.inventory = new InventoryEntity();
          newDetails.inventory.id = productDetails.inventory.id;
          newDetails.inventory.quantity = productDetails.inventory.quantity;

          newDetails.inventory.branch = new BranchesEntity();
          newDetails.inventory.branch.id = productDetails.inventory.branchId;

          newDetails.price = new ProductsPricesEntity();
          newDetails.price.id = productDetails.price.id;
          newDetails.price.amount = productDetails.price.amount;

          return newDetails;
        });
      await queryRunner.manager.save<ProductsDetailsEntity>(newProductDetails);

      product.details = newProductDetails;
      await queryRunner.manager.save<ProductsEntity>(product);

      await queryRunner.commitTransaction();
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message);
    } finally {
      await queryRunner.release();
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
