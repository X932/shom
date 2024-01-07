import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductsDetailsEntity } from '../../products/models/products-details.entity';
import { ProductsEntity } from '../../products/models/products.entity';

@Entity('inventory')
export class InventoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(
    () => ProductsEntity,
    (product: ProductsEntity) => product.inventories,
  )
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntity;

  @OneToMany(
    () => ProductsDetailsEntity,
    (productDetails: ProductsDetailsEntity) => productDetails.inventory,
  )
  productsDetails: ProductsDetailsEntity[];

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
