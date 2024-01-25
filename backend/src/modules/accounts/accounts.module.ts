import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsEntity } from './models/accounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountsEntity])],
})
export class AccountsModule {}
