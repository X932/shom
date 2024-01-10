import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchesEntity } from './models/branches.entity';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(BranchesEntity)
    private readonly branchesRepository: Repository<BranchesEntity>,
  ) {}

  public async getList(): Promise<BranchesEntity[]> {
    return await this.branchesRepository.find();
  }
}
