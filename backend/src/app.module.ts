import { join } from 'path';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { InventoryModule } from './modules/inventory/inventory.module';
import { InventoryEntity } from './modules/inventory/models/inventory.entity';
import { MediaModule } from './modules/media/media.module';
import { ProductsDetailsEntity } from './modules/products/models/products-details.entity';
import { ProductsPricesEntity } from './modules/products/models/products-prices.entity';
import { ProductsModule } from './modules/products/products.module';
import { ProductsEntity } from './modules/products/models/products.entity';
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
    ProductsModule,
    MediaModule,
    InventoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: 'files',
    }),
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
        InventoryEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
