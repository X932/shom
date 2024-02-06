import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetailsEntity } from './models/invoice-details.entity';
import { InvoicesEntity } from './models/invoices.entity';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { ProductsModule } from '../products/products.module';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoicesEntity, InvoiceDetailsEntity]),
    ProductsModule,
    AccountsModule,
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
