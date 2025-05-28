import { join } from 'path';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AccountsHistoryModule } from './modules/accounts-history/accounts-history.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { BranchesModule } from './modules/branches/branches.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { MediaModule } from './modules/media/media.module';
import { ProductsModule } from './modules/products/products.module';
import { EndpointsModule } from './modules/endpoints/endpoints.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    BranchesModule,
    AccountsModule,
    InvoicesModule,
    AccountsHistoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: 'files',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_DATABASE_URL,
      entities: ['./modules/*/**.entity.ts'],
      migrations: ['./shared/migrations/*.ts'],
      autoLoadEntities: true,
      synchronize: false,
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
