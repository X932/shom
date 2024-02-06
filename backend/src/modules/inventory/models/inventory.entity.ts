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
import { BranchesEntity } from '../../branches/models/branches.entity';
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

  @ManyToOne(
    () => BranchesEntity,
    (branch: BranchesEntity) => branch.inventories,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'branch_id' })
  branch: BranchesEntity;

  @OneToMany(
    () => ProductsDetailsEntity,
    (productDetails: ProductsDetailsEntity) => productDetails.inventory,
  )
  productsDetails: ProductsDetailsEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
