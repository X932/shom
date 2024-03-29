import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColumnMoneyTransformer } from '@transformers/columnMoneyTransformer';
import { AccountsHistoryEntity } from '../../accounts-history/models/accounts-history.entity';
import { InvoicesEntity } from '../../invoices/models/invoices.entity';

@Entity('accounts')
export class AccountsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new ColumnMoneyTransformer(),
  })
  amount: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => InvoicesEntity, (invoice) => invoice.account)
  invoices: InvoicesEntity[];

  @OneToMany(
    () => AccountsHistoryEntity,
    (accountHistory) => accountHistory.account,
  )
  accountHistory: AccountsHistoryEntity[];
}
