import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { RolesEntity } from '../../roles/models/roles.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ name: 'first_name', default: '' })
  firstName: string;

  @Column({ name: 'last_name', default: '' })
  lastName: string;

  @ManyToOne(() => RolesEntity, (role) => role.users, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role: RolesEntity;
}
