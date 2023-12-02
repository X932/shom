import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductsPricesEntity } from './products-prices.entity';
import { ProductsEntity } from './products.entity';
import { InventoryEntity } from '../../inventory/models/inventory.entity';

@Entity('products_details')
export class ProductsDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;

  @ManyToMany(() => ProductsEntity, (product) => product.details)
  product: ProductsEntity;

  @OneToOne(() => ProductsPricesEntity)
  @JoinColumn({ name: 'price_id' })
  price: ProductsPricesEntity;

  @ManyToOne(
    () => InventoryEntity,
    (inventory: InventoryEntity) => inventory.productsDetails,
  )
  @JoinColumn({ name: 'inventory_id' })
  inventory: InventoryEntity;
}
