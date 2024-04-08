import { AccountsEntity } from './../../accounts/models/accounts.entity';
import { ACCOUNT_HISTORY_TYPES } from './accounts-history.constant';
import { AccountsHistoryEntity } from './accounts-history.entity';

export interface IStatisticMaxAmount {
  maxAmount: number;
}

export interface IStatistic {
  amount: number;
  period: string;
  type: ACCOUNT_HISTORY_TYPES;
}

export interface IStatisticResponse {
  maxAmount: number;
  statistic: IStatistic[];
  accountsHistory: AccountsHistoryEntity[];
  accounts: AccountsEntity[];
}

export interface IWeeklyStatisticQueryResult {
  amount: number;
  createdAt: Date;
  type: ACCOUNT_HISTORY_TYPES;
}

export interface IMonthlyStatisticQueryResult {
  amount: number;
  weekNumber: number;
  type: ACCOUNT_HISTORY_TYPES;
}
