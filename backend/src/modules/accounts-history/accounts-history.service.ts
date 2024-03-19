import { BadRequestException, Injectable } from '@nestjs/common';
import {
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MONDAY_INDEX,
  StatisticType,
} from './models/accounts-history.constant';
import {
  IMonthlyStatisticQueryResult,
  IStatistic,
  IStatisticResponse,
  IWeeklyStatisticQueryResult,
} from './models/accounts-history.type';
import { AccountsHistoryEntity } from './models/accounts-history.entity';
import { GetStatisticParamsDto } from './models/accounts-history.dto';

@Injectable()
export class AccountsHistoryService {
  constructor(
    @InjectRepository(AccountsHistoryEntity)
    private readonly accountsHistoryRepository: Repository<AccountsHistoryEntity>,
  ) {}

  public async getStatistic(
    getStatisticParams: GetStatisticParamsDto,
  ): Promise<IStatisticResponse> {
    const { currentDate, type } = getStatisticParams;

    try {
      switch (type) {
        case StatisticType.WEEK:
          return this.getWeeklyStatistic(currentDate);

        case StatisticType.MONTH:
          return this.getMonthlyStatistic(currentDate);

        default:
          break;
      }
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  private async getMonthlyStatistic(
    currentDate: Date,
  ): Promise<IStatisticResponse> {
    const startMonthDate = format(
      startOfMonth(currentDate),
      'yyyy-MM-dd HH:mm:ss',
    );
    const endMonthDate = format(endOfMonth(currentDate), 'yyyy-MM-dd HH:mm:ss');

    const histories: IMonthlyStatisticQueryResult[] =
      await this.accountsHistoryRepository
        .createQueryBuilder('account_history')
        .select('CAST(SUM(account_history.amount) AS FLOAT)', 'amount')
        .addSelect(
          "DATE_PART('WEEK', CAST(account_history.created_at AS DATE))",
          'weekNumber',
        )
        .where('account_history.created_at BETWEEN :startDate AND :endDate', {
          startDate: startMonthDate,
          endDate: endMonthDate,
        })
        .groupBy("DATE_PART('WEEK', CAST(account_history.created_at AS DATE))")
        .orderBy("DATE_PART('WEEK', CAST(account_history.created_at AS DATE))")
        .getRawMany();

    let maxAmount = 0;
    const statistic = histories.reduce<IStatistic[]>(
      (previousValue, currentValue) => {
        if (maxAmount < currentValue.amount) {
          maxAmount = currentValue.amount;
        }

        const startDay = startOfWeek(
          addWeeks(startOfYear(currentDate), currentValue.weekNumber - 1),
          { weekStartsOn: MONDAY_INDEX },
        );
        const endDay = endOfWeek(startDay, { weekStartsOn: MONDAY_INDEX });

        const income: IStatistic = {
          amount: currentValue.amount,
          period: `${format(startDay, 'dd.MM.yyyy')}-${format(
            endDay,
            'dd.MM.yyyy',
          )}`,
        };
        // TODO till creating expenses
        const expense: IStatistic = {
          amount: 130,
          period: '',
        };
        return [...previousValue, income, expense];
      },
      [],
    );

    return {
      maxAmount: maxAmount,
      data: statistic,
    };
  }

  private async getWeeklyStatistic(
    currentDate: Date,
  ): Promise<IStatisticResponse> {
    const startWeekDate = format(
      startOfWeek(currentDate, { weekStartsOn: MONDAY_INDEX }),
      'yyyy-MM-dd HH:mm:ss',
    );
    const endWeekDate = format(
      endOfWeek(currentDate, { weekStartsOn: MONDAY_INDEX }),
      'yyyy-MM-dd HH:mm:ss',
    );

    const histories: IWeeklyStatisticQueryResult[] =
      await this.accountsHistoryRepository
        .createQueryBuilder('account_history')
        .select('CAST(SUM(account_history.amount) AS FLOAT)', 'amount')
        .addSelect('CAST(account_history.created_at AS DATE)', 'createdAt')
        .where('account_history.created_at BETWEEN :startDate AND :endDate', {
          startDate: startWeekDate,
          endDate: endWeekDate,
        })
        .groupBy('CAST(account_history.created_at AS DATE)')
        .orderBy('CAST(account_history.created_at AS DATE)')
        .getRawMany();

    let maxAmount = 0;
    const statistic = histories.reduce<IStatistic[]>(
      (previousValue, currentValue) => {
        if (maxAmount < currentValue.amount) {
          maxAmount = currentValue.amount;
        }

        const income: IStatistic = {
          amount: currentValue.amount,
          period: format(currentValue.createdAt, 'dd.MM.yyyy'),
        };
        // TODO till creating expenses
        const expense: IStatistic = {
          amount: 120,
          period: '',
        };
        return [...previousValue, income, expense];
      },
      [],
    );

    return {
      maxAmount: maxAmount,
      data: statistic,
    };
  }
}
