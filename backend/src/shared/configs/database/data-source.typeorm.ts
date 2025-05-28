import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_DATABASE_URL,
  entities: ['src/modules/**/models/*.entity.ts'],
  migrations: ['src/shared/migrations/*.ts'],
  synchronize: false,
});

export default dataSource;
