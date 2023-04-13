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

  public async create(params: CreateEndpointDto) {
    const isEndpointExist = (await this.find(params)).length > 0;

    if (isEndpointExist) {
      throw new BadRequestException();
    }
    await this.endpointsRepository.save(params);
  }

  private async checkEndpoint(id: number) {
    const isEndpointExist = (await this.find({ id: id })).length > 0;

    if (!isEndpointExist) {
      throw new BadRequestException();
    }
  }

  public async update(params: EndpointDto) {
    await this.checkEndpoint(params.id);
    await this.endpointsRepository.save(params);
  }

  public async delete(id: number) {
    await this.checkEndpoint(id);
    await this.endpointsRepository.delete({ id: id });
  }
}
