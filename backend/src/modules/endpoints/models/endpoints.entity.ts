import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('endpoints')
export class EndpointsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  title: string;
}
