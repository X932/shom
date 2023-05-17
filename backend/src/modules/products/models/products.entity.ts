import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductsDetailsEntity } from './products-details.entity';
import { ProductsPricesEntity } from './products-prices.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'img_path' })
  imgPath: string;

  @ManyToMany(() => ProductsDetailsEntity, (details) => details.product)
  @JoinTable({
    name: 'full_products_info',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_details_id',
      referencedColumnName: 'id',
    },
  })
  details: ProductsDetailsEntity[];

  @ManyToOne(() => ProductsPricesEntity, (productPrice) => productPrice.product)
  @JoinColumn({ name: 'price_id' })
  priceDetails: ProductsPricesEntity;
}
