import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRole } from './models/roles.type';
import { RoleDto, UpdateRoleDto } from './models/roles.dto';
import { RolesEntity } from './models/roles.entity';
import { EndpointsService } from '../endpoints/endpoints.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
    private endpointsService: EndpointsService,
  ) {}

  public async find(params?: Partial<IRole>): Promise<RolesEntity[]> {
    return await this.rolesRepository.find({
      relations: {
        endpoints: true,
      },
      where: {
        id: params?.id,
        title: params?.title,
      },
    });
  }

  public async delete(id: number): Promise<void> {
    const isRoleExist = (await this.find({ id: id })).length > 0;

    if (!isRoleExist) {
      throw new BadRequestException();
    }
    await this.rolesRepository.delete({ id: id });
  }

  public async create(newRole: RoleDto): Promise<void> {
    const isRoleExist = (await this.find({ title: newRole.title })).length > 0;

    if (isRoleExist) {
      throw new BadRequestException();
    }
    await this.rolesRepository.save(newRole);
  }

  public async update(updatedRole: UpdateRoleDto): Promise<void> {
    if (updatedRole.endpoints.length === 0) {
      await this.rolesRepository.save(updatedRole);
    } else {
      const endpoints = await this.endpointsService.find(updatedRole.endpoints);
      await this.rolesRepository.save({ ...updatedRole, endpoints: endpoints });
    }
  }
}
