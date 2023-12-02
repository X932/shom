import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductsDetailsEntity } from '../../products/models/products-details.entity';
import { ProductsEntity } from '../../products/models/products.entity';

@Entity('inventory')
export class InventoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @OneToMany(
    () => ProductsEntity,
    (product: ProductsEntity) => product.inventory,
    {
      cascade: true,
    },
  )
  products: ProductsEntity[];

  @OneToMany(
    () => ProductsDetailsEntity,
    (productDetails: ProductsDetailsEntity) => productDetails.inventory,
    {
      cascade: true,
    },
  )
  productsDetails: ProductsDetailsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
