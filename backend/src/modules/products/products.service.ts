import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { IDataList } from '@common-types/data-list';
import { ProductsDetailsEntity } from './models/products-details.entity';
import { ProductsPricesEntity } from './models/products-prices.entity';
import {
  CreateProductDto,
  GetProductDto,
  UpdateProductDto,
} from './models/products.dto';
import { ProductsEntity } from './models/products.entity';
import { InventoryEntity } from '../inventory/models/inventory.entity';
import { BranchesEntity } from '../branches/models/branches.entity';
import { BranchesService } from '../branches/branches.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
    private readonly dataSource: DataSource,
    private readonly branchesService: BranchesService,
  ) {}

  private async isExist(
    getProductDto: Partial<GetProductDto>,
  ): Promise<boolean> {
    return await this.productsRepository.exist({
      where: {
        id: getProductDto.id,
        title: getProductDto.title,
      },
    });
  }

  public async create(product: CreateProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const isProductExist = await this.isExist({
        title: product.title,
      });

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

  public async find(
    getProductDto?: GetProductDto,
  ): Promise<IDataList<ProductsEntity>> {
    const { title = '', id, rowsLimit, rowsOffset } = getProductDto;

    const query = this.productsRepository
      .createQueryBuilder('product')
      .where('LOWER(product.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });

    if (id) {
      query.andWhere('product.id = :id', { id: id });
    }

    const [products, totalCount] = await query
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('details.price', 'price')
      .leftJoinAndSelect('details.inventory', 'inventory')
      .leftJoinAndSelect('inventory.branch', 'branch')
      .take(rowsLimit)
      .skip(rowsOffset * rowsLimit)
      .getManyAndCount();

    return { data: products, totalCount: totalCount };
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

    const isProductExist = await this.isExist({
      id: updateProductDto.id,
    });

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

      const newProductDetails: ProductsDetailsEntity[] = [];

      for (const key in updateProductDto.details) {
        const productDetails = updateProductDto.details[key];

        const newDetails = new ProductsDetailsEntity();
        newDetails.id = productDetails.id;
        newDetails.size = productDetails.size;

        newDetails.inventory = new InventoryEntity();
        newDetails.inventory.product = product;
        newDetails.inventory.id = productDetails.inventory.id;
        newDetails.inventory.quantity = productDetails.inventory.quantity;

        newDetails.inventory.branch = await this.branchesService.getById(
          productDetails.inventory.branchId,
        );

        newDetails.price = new ProductsPricesEntity();
        newDetails.price.id = productDetails.price.id;
        newDetails.price.amount = productDetails.price.amount;

        newProductDetails.push(newDetails);
      }
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
