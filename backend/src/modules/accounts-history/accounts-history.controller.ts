import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guards/jwt.guard';
import { AccountsHistoryService } from './accounts-history.service';
import { GetStatisticParamsDto } from './models/accounts-history.dto';

@UseGuards(JwtAuthGuard)
@Controller('accounts-history')
export class AccountsHistoryController {
  constructor(
    private readonly accountsHistoryService: AccountsHistoryService,
  ) {}

  @Get('statistic')
  getStatistic(@Query() getStatisticParams: GetStatisticParamsDto) {
    return this.accountsHistoryService.getStatistic(getStatisticParams);
  }
}
