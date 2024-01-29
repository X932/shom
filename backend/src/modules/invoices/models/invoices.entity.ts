import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountsEntity } from '../../accounts/models/accounts.entity';

@Entity('invoices')
export class InvoicesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'net_amount' })
  netAmount: string;

  @Column({ name: 'gross_amount' })
  grossAmount: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => AccountsEntity, (account) => account.invoices)
  @JoinColumn({ name: 'account_id' })
  account: AccountsEntity;
}
