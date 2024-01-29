import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProductsPricesEntity } from './products-prices.entity';
import { ProductsEntity } from './products.entity';
import { InventoryEntity } from '../../inventory/models/inventory.entity';
import { InvoiceDetailsEntity } from '../../invoices/models/invoice-details.entity';

@Entity('products_details')
export class ProductsDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;

  @OneToMany(
    () => InvoiceDetailsEntity,
    (invoiceDetails: InvoiceDetailsEntity) => invoiceDetails.productDetails,
  )
  invoiceDetails: InvoiceDetailsEntity[];

  @ManyToMany(() => ProductsEntity, (product) => product.details, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductsEntity;

  @OneToOne(() => ProductsPricesEntity, { cascade: true })
  @JoinColumn({ name: 'price_id' })
  price: ProductsPricesEntity;

  @ManyToOne(
    () => InventoryEntity,
    (inventory: InventoryEntity) => inventory.productsDetails,
    { cascade: true, orphanedRowAction: 'soft-delete' },
  )
  @JoinColumn({ name: 'inventory_id' })
  inventory: InventoryEntity;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
