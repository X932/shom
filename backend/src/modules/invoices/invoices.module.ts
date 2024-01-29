import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesEntity } from './models/invoices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoicesEntity])],
})
export class InvoicesModule {}
