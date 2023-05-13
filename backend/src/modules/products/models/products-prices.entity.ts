import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductsDetailsEntity } from './products-details.entity';
import { ProductsEntity } from './products.entity';

@Entity('products_prices')
export class ProductsPricesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductsEntity, (product) => product.price)
  product: ProductsEntity[];

  @OneToOne(() => ProductsDetailsEntity)
  @JoinColumn({ name: 'product_details_id' })
  productDetails: ProductsDetailsEntity;

  @Column()
  price: number;
}
