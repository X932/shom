import { Exclude } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products_prices')
export class ProductsPricesEntity {
  // todo - add column valid_until
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt?: Date;
}
