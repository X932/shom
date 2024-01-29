import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetailsEntity } from './models/invoice-details.entity';
import { InvoicesEntity } from './models/invoices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoicesEntity, InvoiceDetailsEntity])],
})
export class InvoicesModule {}
