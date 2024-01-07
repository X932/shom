import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
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

  @ManyToMany(() => ProductsDetailsEntity, (details) => details.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'soft-delete',
  })
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

  @OneToMany(
    () => InventoryEntity,
    (inventory: InventoryEntity) => inventory.product,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: true,
    },
  )
  inventories: InventoryEntity[];

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
