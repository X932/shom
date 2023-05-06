import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'img_path' })
  imgPath: string;

  @ManyToMany(() => ProductsDetailsEntity)
  @JoinTable({
    name: 'full_products_info',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_details_id',
      referencedColumnName: 'id',
    },
  })
  details: ProductsDetailsEntity[];
}

@Entity('products_details')
export class ProductsDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;
}

@Entity('products_prices')
export class ProductsPricesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ProductsEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntity;

  @OneToOne(() => ProductsDetailsEntity)
  @JoinColumn({ name: 'product_details_id' })
  productDetails: ProductsDetailsEntity;

  @Column()
  price: number;
}
