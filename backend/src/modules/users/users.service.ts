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

  private async checkUser(params?: Partial<IUser>): Promise<void> {
    const isUserExist = (await this.find(params)).length > 0;

    if (isUserExist) {
      throw new BadRequestException();
    }
  }

  public async create(newUser: Omit<IUser, 'id'>): Promise<void> {
    await this.checkUser({ phone: newUser.phone });
    await this.usersRepository.save(newUser);
  }

  public async delete(id: number) {
    await this.checkUser({ id: id });
    await this.usersRepository.delete({ id: id });
  }
}
