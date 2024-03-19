import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsHistoryEntity } from './models/accounts-history.entity';
import { AccountsHistoryController } from './accounts-history.controller';
import { AccountsHistoryService } from './accounts-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountsHistoryEntity])],
  controllers: [AccountsHistoryController],
  providers: [AccountsHistoryService],
})
export class AccountsHistoryModule {}
