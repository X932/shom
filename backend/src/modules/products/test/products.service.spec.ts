import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { getNewProductSub, findOneProductSub } from './subs';
import { ProductsEntity } from '../models/products.entity';
import { ProductsService } from '../products.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(() => ({
  createQueryRunner: jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    release: jest.fn(),
    rollbackTransaction: jest.fn(),
    manager: {
      save: jest.fn((params) => Promise.resolve(params)),
    },
  })),
}));

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductsEntity),
          useValue: {
            find: jest.fn((params) =>
              Promise.resolve(findOneProductSub(params)),
            ),
          },
        },
        {
          provide: DataSource,
          useValue: dataSourceMockFactory(),
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('create new product in catalog', async () => {
    expect(await service.create(getNewProductSub())).toBeUndefined();
  });
});
