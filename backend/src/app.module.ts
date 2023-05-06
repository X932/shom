import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProductsDetailsEntity,
  ProductsEntity,
  ProductsPricesEntity,
} from './modules/products/models/products.entity';
import { RolesEntity } from './modules/roles/models/roles.entity';
import { EndpointsEntity } from './modules/endpoints/models/endpoints.entity';
import { EndpointsModule } from './modules/endpoints/endpoints.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersEntity } from './modules/users/models/users.entity';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    RolesModule,
    EndpointsModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [
        UsersEntity,
        RolesEntity,
        EndpointsEntity,
        ProductsEntity,
        ProductsDetailsEntity,
        ProductsPricesEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
