import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRole } from './models/roles.type';
import { CreateRoleDto, UpdateRoleDto } from './models/roles.dto';
import { RolesEntity } from './models/roles.entity';
import { EndpointsService } from '../endpoints/endpoints.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
    private endpointsService: EndpointsService,
  ) {}

  public async find(parameters?: Partial<IRole>) {
    return await this.rolesRepository.find({
      relations: {
        endpoints: true,
      },
      where: {
        id: parameters?.id,
        title: parameters?.title,
      },
    });
  }

  public async create(newRole: CreateRoleDto) {
    const isRoleExist = (await this.find({ title: newRole.title })).length > 0;

    if (isRoleExist) {
      throw new BadRequestException();
    }

    await this.rolesRepository.save(newRole);
  }

  public async update(updatedRole: UpdateRoleDto) {
    if (updatedRole.endpoints.length === 0) {
      await this.rolesRepository.save(updatedRole);
    } else {
      const endpoints = await this.endpointsService.find(updatedRole.endpoints);
      await this.rolesRepository.save({ ...updatedRole, endpoints: endpoints });
    }
  }
}
