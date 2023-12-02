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
import { InventoryEntity } from '../../inventory/models/inventory.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

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

  @ManyToOne(
    () => InventoryEntity,
    (inventory: InventoryEntity) => inventory.products,
  )
  @JoinColumn({ name: 'inventory_id' })
  inventory: InventoryEntity;
}
