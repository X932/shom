import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  public create() {
    return this.usersRepository.save({
      hashedPassword: 'dsmck',
      phone: '1234',
    });
  }

  public find() {
    return this.usersRepository.find();
  }
}
