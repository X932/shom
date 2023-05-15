import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductsEntity } from './products.entity';

@Entity('products_details')
export class ProductsDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;

  @Column()
  description: string;

  @ManyToMany(() => ProductsEntity, (product) => product.details)
  product: ProductsEntity;
}
