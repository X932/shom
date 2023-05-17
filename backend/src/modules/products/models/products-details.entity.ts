import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductsPricesEntity } from './products-prices.entity';
import { ProductsEntity } from './products.entity';

@Entity('products_details')
export class ProductsDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;

  @Column()
  description: string;

  @ManyToMany(() => ProductsEntity, (product) => product.details)
  product: ProductsEntity;

  @OneToOne(() => ProductsPricesEntity)
  @JoinColumn({ name: 'price_id' })
  price: ProductsPricesEntity;
}
