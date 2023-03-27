import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/models/users.entity';
import { EndpointsEntity } from '../../endpoints/models/endpoints.entity';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => EndpointsEntity, (endpoint) => endpoint.role)
  @JoinTable({
    name: 'roles_endpoints',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'endpoint_id',
      referencedColumnName: 'id',
    },
  })
  endpoints: EndpointsEntity[];

  @OneToOne(() => UsersEntity)
  user: UsersEntity;
}
