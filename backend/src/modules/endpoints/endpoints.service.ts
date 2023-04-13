import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEndpointDto, EndpointDto } from './models/endpoints.dto';
import { EndpointsEntity } from './models/endpoints.entity';
import { EndpointMetaData } from './models/endpoints.type';

@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(EndpointsEntity)
    private endpointsRepository: Repository<EndpointsEntity>,
  ) {}

  public async find(
    endpoints?: Partial<EndpointMetaData> | Partial<EndpointMetaData>[],
  ): Promise<EndpointsEntity[]> {
    return await this.endpointsRepository.find({
      where: endpoints,
    });
  }

  private async checkEndpoint(
    params?: Partial<EndpointMetaData>,
  ): Promise<void> {
    const isEndpointExist = (await this.find(params)).length > 0;

    if (isEndpointExist) {
      throw new BadRequestException();
    }
  }

  public async create(params: CreateEndpointDto) {
    await this.checkEndpoint(params);
    await this.endpointsRepository.save(params);
  }

  public async update(params: EndpointDto) {
    const oldEndpoint = (await this.find({ id: params.id }))[0];
    if (!oldEndpoint) {
      throw new BadRequestException();
    }
    await this.endpointsRepository.save(params);
  }
}
