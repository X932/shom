import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ColumnMoneyTransformer } from '@transformers/columnMoneyTransformer';
import { ACCOUNT_HISTORY_TYPES } from './accounts-history.constant';
import { AccountsEntity } from '../../accounts/models/accounts.entity';

@Entity('accounts_history')
export class AccountsHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new ColumnMoneyTransformer(),
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: ACCOUNT_HISTORY_TYPES,
  })
  type: ACCOUNT_HISTORY_TYPES;

  @Column({ nullable: true })
  description?: string;

  @Exclude()
  @Column({
    type: 'boolean',
    name: 'is_excluded_from_statistic',
  })
  isExcludedFromStatistic: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date;

  @ManyToOne(() => AccountsEntity, (account) => account.accountHistory)
  @JoinColumn({ name: 'account_id' })
  account: AccountsEntity;
}
