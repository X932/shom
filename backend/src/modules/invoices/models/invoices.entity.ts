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
import { InvoiceDetailsEntity } from './invoice-details.entity';
import { AccountsEntity } from '../../accounts/models/accounts.entity';

@Entity('invoices')
export class InvoicesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'net_amount' })
  netAmount: number;

  @Column({ name: 'gross_amount' })
  grossAmount: number;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
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
