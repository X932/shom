import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsDetailsEntity } from './models/products-details.entity';
import { ProductsPricesEntity } from './models/products-prices.entity';
import { ProductsEntity } from './models/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { BranchesModule } from '../branches/branches.module';
import { MediaService } from '../media/media.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, MediaService],
  imports: [
    TypeOrmModule.forFeature([
      ProductsEntity,
      ProductsDetailsEntity,
      ProductsPricesEntity,
    ]),
    BranchesModule,
  ],
})
export class ProductsModule {}
