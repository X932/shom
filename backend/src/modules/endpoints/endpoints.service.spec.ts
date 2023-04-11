import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EndpointMetaData } from './models/endpoints.type';
import { CreateEndpointDto } from './models/endpoints.dto';
import { EndpointsService } from './endpoints.service';
import { EndpointsEntity } from './models/endpoints.entity';

function getNewEndpointSub() {
  const endpoint = new CreateEndpointDto();
  endpoint.key = 'DELETE /api/users';
  endpoint.title = 'Delete user';
  return endpoint;
}

function createSubEndpoint() {
  const subEndpoint = new EndpointMetaData();
  subEndpoint.id = 0;
  subEndpoint.key = 'GET /api/users';
  subEndpoint.title = 'Get users';
  return subEndpoint;
}

function getEndpointsSub(params: { where: EndpointMetaData }) {
  const subEndpointGetUsers = createSubEndpoint();

  const subEndpointUpdateUser = new EndpointMetaData();
  subEndpointUpdateUser.id = 1;
  subEndpointUpdateUser.key = 'PUT /api/users';
  subEndpointUpdateUser.title = 'Update user data';
  const endpoints = [subEndpointGetUsers, subEndpointUpdateUser];

  return endpoints.filter(
    (endpoint) =>
      endpoint.id === params.where.id &&
      endpoint.key === params.where.key &&
      endpoint.title === params.where.title,
  );
}

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
