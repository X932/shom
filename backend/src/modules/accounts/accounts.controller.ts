import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { ROUTES } from '@constants/routes';
import { AccountsService } from './accounts.service';
import { AccountsEntity } from './models/accounts.entity';

@UseGuards(JwtAuthGuard)
@Controller(ROUTES.ACCOUNTS)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getList(): Promise<AccountsEntity[]> {
    return this.accountsService.getList();
  }
}
