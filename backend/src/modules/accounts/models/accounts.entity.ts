import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoicesEntity } from '../../invoices/models/invoices.entity';

@Entity('accounts')
export class AccountsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => InvoicesEntity, (invoice) => invoice.account)
  invoices: InvoicesEntity[];
}
