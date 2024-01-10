import { Exclude } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryEntity } from '../../inventory/models/inventory.entity';

@Entity('branches')
export class BranchesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => InventoryEntity,
    (inventory: InventoryEntity) => inventory.branch,
  )
  inventories: InventoryEntity[];

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
