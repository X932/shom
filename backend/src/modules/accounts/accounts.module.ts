import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsEntity } from './models/accounts.entity';
import { AccountsService } from './accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountsEntity])],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
