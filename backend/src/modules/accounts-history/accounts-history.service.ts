import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { Repository, DataSource, EntityManager } from 'typeorm';
import {
  ACCOUNT_HISTORY_TYPES,
  MONDAY_INDEX,
  StatisticType,
} from './models/accounts-history.constant';
import {
  IMonthlyStatisticQueryResult,
  IStatistic,
  IStatisticMaxAmount,
  IStatisticResponse,
} from './models/accounts-history.type';
import { AccountsHistoryEntity } from './models/accounts-history.entity';
import {
  CreateAccountHistoryDto,
  GetStatisticParamsDto,
} from './models/accounts-history.dto';
import { AccountsEntity } from '../accounts/models/accounts.entity';

@Injectable()
export class AccountsHistoryService {
  constructor(
    @InjectRepository(AccountsHistoryEntity)
    private readonly accountsHistoryRepository: Repository<AccountsHistoryEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async create(createAccountHistoryDto: CreateAccountHistoryDto) {
    const { accountId, amount, createdAt, type, description } =
      createAccountHistoryDto;

    await this.dataSource.transaction(async (manager: EntityManager) => {
      const account = await manager.findOneBy(AccountsEntity, {
        id: accountId,
      });

      if (!account) {
        throw new NotFoundException('Счёт не найден');
      }

      const updatedAccount = new AccountsEntity();
      Object.assign(updatedAccount, account);

      if (type === ACCOUNT_HISTORY_TYPES.INCOME) {
        updatedAccount.amount = updatedAccount.amount + amount;
      } else {
        updatedAccount.amount = updatedAccount.amount - amount;
      }

      if (updatedAccount.amount < 0) {
        throw new BadRequestException('На счету недостаточно средств');
      }

      await manager.save(updatedAccount);

      const newAccountHistory = new AccountsHistoryEntity();
      newAccountHistory.account = updatedAccount;
      newAccountHistory.amount = amount;
      newAccountHistory.description = description;
      newAccountHistory.isExcludedFromStatistic = false;
      newAccountHistory.type = type;
      newAccountHistory.createdAt = createdAt;
      await manager.save(newAccountHistory);
    });
  }

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

    return await this.dataSource.transaction<IStatisticResponse>(
      async (manager: EntityManager) => {
        const accountsHistory = await manager
          .createQueryBuilder(AccountsHistoryEntity, 'account_history')
          .leftJoinAndSelect('account_history.account', 'account')
          .andWhere(
            'account_history.createdAt BETWEEN :createdAtStart AND :createdAtEnd',
            {
              createdAtStart: startMonthDate,
              createdAtEnd: endMonthDate,
            },
          )
          .orderBy('account_history.createdAt', 'DESC')
          .getMany();

        const history: IMonthlyStatisticQueryResult[] = await manager.query(
          `select
              account_history.type AS type,
              CAST(SUM(account_history.amount) AS FLOAT) AS amount,
              DATE_PART('WEEK', CAST(account_history.created_at AS DATE)) AS "weekNumber"
            from accounts_history account_history
            where account_history.created_at BETWEEN $1 AND $2
            group by DATE_PART('WEEK', CAST(account_history.created_at AS DATE)), type`,
          [startMonthDate, endMonthDate],
        );

        let maxAmount = 0;
        const statistic: IStatistic[] = history.map((data) => {
          if (maxAmount < data.amount) {
            maxAmount = data.amount;
          }

          const startDay = startOfWeek(
            addWeeks(startOfYear(currentDate), data.weekNumber - 1),
            { weekStartsOn: MONDAY_INDEX },
          );
          const endDay = endOfWeek(startDay, { weekStartsOn: MONDAY_INDEX });

          const income: IStatistic = {
            amount: data.amount,
            period: `${format(startDay, 'dd')} - ${format(endDay, 'dd')}`,
            type: data.type,
          };

          return income;
        });

        return {
          maxAmount: maxAmount,
          statistic: statistic,
          accountsHistory: accountsHistory,
        };
      },
    );
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

    return await this.dataSource.transaction<IStatisticResponse>(
      async (manager: EntityManager) => {
        const statistic: IStatistic[] = await manager.query(
          `select 
            CAST(SUM(account_history.amount) AS FLOAT) AS amount,
            TO_CHAR(account_history.created_at, 'DD.MM') AS period,
            account_history.type AS type
          from accounts_history account_history
          where account_history.created_at BETWEEN $1 AND $2
          group by period, type
          order by period`,
          [startWeekDate, endWeekDate],
        );

        const maxAmount: IStatisticMaxAmount[] = await manager.query(
          `select
            MAX(amount) as "maxAmount"
          from (select 
                  CAST(SUM(account_history.amount) AS FLOAT) AS amount,
                  TO_CHAR(account_history.created_at, 'DD.MM') AS period,
                  account_history.type AS type
                from accounts_history account_history
                where account_history.created_at BETWEEN $1 AND $2
                group by period, type
                order by period) as sub_query`,
          [startWeekDate, endWeekDate],
        );

        const accountsHistory = await manager
          .createQueryBuilder(AccountsHistoryEntity, 'account_history')
          .leftJoinAndSelect('account_history.account', 'account')
          .andWhere(
            'account_history.createdAt BETWEEN :createdAtStart AND :createdAtEnd',
            {
              createdAtStart: startWeekDate,
              createdAtEnd: endWeekDate,
            },
          )
          .orderBy('account_history.createdAt', 'DESC')
          .getMany();

        return {
          maxAmount: maxAmount[0].maxAmount || 0,
          statistic: statistic,
          accountsHistory: accountsHistory,
        };
      },
    );
  }
}
