import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsEntity } from './models/accounts.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountsEntity)
    private readonly accountsRepository: Repository<AccountsEntity>,
  ) {}

  public async isExist(id: number): Promise<boolean> {
    return await this.accountsRepository.exist({ where: { id: id } });
  }

  public async getList(): Promise<AccountsEntity[]> {
    return await this.accountsRepository.find();
  }
}
