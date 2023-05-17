import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products_prices')
export class ProductsPricesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;
}
