import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColumnMoneyTransformer } from '@transformers/columnMoneyTransformer';
import { InvoiceDetailsEntity } from './invoice-details.entity';
import { AccountsEntity } from '../../accounts/models/accounts.entity';

@Entity('invoices')
export class InvoicesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'net_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new ColumnMoneyTransformer(),
  })
  netAmount: number;

  @Column({
    name: 'gross_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new ColumnMoneyTransformer(),
  })
  grossAmount: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => AccountsEntity, (account) => account.invoices)
  @JoinColumn({ name: 'account_id' })
  account: AccountsEntity;

  @OneToMany(
    () => InvoiceDetailsEntity,
    (invoiceDetails: InvoiceDetailsEntity) => invoiceDetails.invoice,
  )
  invoiceDetails: InvoiceDetailsEntity[];
}
