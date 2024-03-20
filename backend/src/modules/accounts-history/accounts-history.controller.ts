import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { ROUTES } from '@constants/routes';
import { AccountsHistoryService } from './accounts-history.service';
import { GetStatisticParamsDto } from './models/accounts-history.dto';

@UseGuards(JwtAuthGuard)
@Controller(ROUTES.ACCOUNTS_HISTORY)
export class AccountsHistoryController {
  constructor(
    private readonly accountsHistoryService: AccountsHistoryService,
  ) {}

  @Get(ROUTES.ACCOUNTS_STATISTIC)
  getStatistic(@Query() getStatisticParams: GetStatisticParamsDto) {
    return this.accountsHistoryService.getStatistic(getStatisticParams);
  }
}
