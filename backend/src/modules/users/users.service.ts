import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from './models/users.type';
import { UsersEntity } from './models/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  public async find(parameters?: Partial<IUser>) {
    return await this.usersRepository.find({
      relations: {
        role: {
          endpoints: true,
        },
      },
      where: {
        id: parameters?.id,
        phone: parameters?.phone,
      },
    });
  }

  public async create(newUser: Omit<IUser, 'id'>) {
    const user = (await this.find({ phone: newUser.phone }))[0];

    if (user) {
      throw new BadRequestException();
    }

    await this.usersRepository.save(newUser);
  }

  public clear() {
    return 'ok bro ;)';
  }
}
