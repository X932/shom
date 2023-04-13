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

  public async find(params?: Partial<IUser>): Promise<UsersEntity[]> {
    return await this.usersRepository.find({
      relations: {
        role: {
          endpoints: true,
        },
      },
      where: {
        id: params?.id,
        phone: params?.phone,
      },
    });
  }

  public async create(newUser: Omit<IUser, 'id'>): Promise<void> {
    const isUserExist = (await this.find({ phone: newUser.phone })).length > 0;

    if (isUserExist) {
      throw new BadRequestException();
    }
    await this.usersRepository.save(newUser);
  }

  public async delete(id: number) {
    const isUserExist = (await this.find({ id: id })).length > 0;

    if (!isUserExist) {
      throw new BadRequestException();
    }
    await this.usersRepository.delete({ id: id });
  }

  public async update(params?: Partial<IUser>): Promise<void> {
    const user = (await this.find({ id: params.id }))[0];

    if (!user) {
      throw new BadRequestException();
    }

    await this.usersRepository.save(params);
  }
}
