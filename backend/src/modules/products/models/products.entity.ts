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
import { InvoiceDetailsEntity } from '../../invoices/models/invoice-details.entity';
import { InventoryEntity } from '../../inventory/models/inventory.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ name: 'img_path' })
  imgPath: string;

  @ManyToMany(() => ProductsDetailsEntity, (details) => details.products, {
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

  @OneToMany(
    () => InvoiceDetailsEntity,
    (invoiceDetails: InvoiceDetailsEntity) => invoiceDetails.product,
  )
  invoiceDetails: InvoiceDetailsEntity[];

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;
}
