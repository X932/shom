import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsHistoryEntity } from './models/accounts-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountsHistoryEntity])],
})
export class AccountsHistoryModule {}
