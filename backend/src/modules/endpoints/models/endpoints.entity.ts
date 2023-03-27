import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEntity } from '../../roles/models/roles.entity';

@Entity('endpoints')
export class EndpointsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  title: string;

  @ManyToMany(() => RolesEntity, (role) => role.endpoints)
  role: RolesEntity;
}
