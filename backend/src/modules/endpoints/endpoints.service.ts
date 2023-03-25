import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EndpointsEntity } from './models/endpoints.entity';

@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(EndpointsEntity)
    private endpointsRepository: Repository<EndpointsEntity>,
  ) {}

  public find() {
    return this.endpointsRepository.find();
  }
}
