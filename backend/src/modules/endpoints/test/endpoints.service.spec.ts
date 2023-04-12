import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createSubEndpoint, getEndpointsSub, getNewEndpointSub } from './subs';
import { EndpointsService } from '../endpoints.service';
import { EndpointsEntity } from '../models/endpoints.entity';

describe('EndpointsService', () => {
  let service: EndpointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EndpointsService,
        {
          provide: getRepositoryToken(EndpointsEntity),
          useValue: {
            find: jest.fn((params) => Promise.resolve(getEndpointsSub(params))),
            create: jest.fn(() => Promise.resolve()),
            save: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    service = module.get<EndpointsService>(EndpointsService);
  });

  it('create new endpoint', async () => {
    expect(await service.create(getNewEndpointSub())).toBeUndefined();
  });

  it('create existed endpoint', async () => {
    await expect(() =>
      service.create(createSubEndpoint()),
    ).rejects.toThrowError(BadRequestException);
  });
});
