import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EndpointsEntity } from './models/endpoints.entity';
import { EndpointMetaData } from './models/endpoints.type';

@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(EndpointsEntity)
    private endpointsRepository: Repository<EndpointsEntity>,
  ) {}

  public async find(
    endpoints: EndpointMetaData | EndpointMetaData[],
  ): Promise<EndpointsEntity[]> {
    return await this.endpointsRepository.find({
      where: endpoints,
    });
  }
}
