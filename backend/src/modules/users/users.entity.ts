import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'hashed_password' })
  hashedPassword: string;

  @Column()
  phone: string;
}
