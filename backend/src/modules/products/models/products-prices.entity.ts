import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products_prices')
export class ProductsPricesEntity {
  // todo - add column valid_until
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;
}
