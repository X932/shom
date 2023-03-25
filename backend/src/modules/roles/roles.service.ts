import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './models/roles.dto';
import { RolesEntity } from './models/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {}

  public async find(roleTitle?: string) {
    return await this.rolesRepository.find({ where: { title: roleTitle } });
  }

  public async create(newRole: CreateRoleDto) {
    const isRoleExist = (await this.find(newRole.title)).length > 0;

    if (isRoleExist) {
      throw new BadRequestException();
    }

    await this.rolesRepository.save(newRole);
    return 'saved';
  }
}
