import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoicesEntity } from './invoices.entity';
import { ProductsEntity } from '../../products/models/products.entity';
import { ProductsDetailsEntity } from '../../products/models/products-details.entity';

@Entity('invoice_details')
export class InvoiceDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discount: number;

  @Column()
  quantity: number;

  @ManyToOne(() => InvoicesEntity, (invoice) => invoice.invoiceDetails)
  @JoinColumn({ name: 'invoice_id' })
  invoice: InvoicesEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.invoiceDetails)
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntity;

  @ManyToOne(
    () => ProductsDetailsEntity,
    (productDetails) => productDetails.invoiceDetails,
  )
  @JoinColumn({ name: 'product_details_id' })
  productDetails: ProductsDetailsEntity;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
