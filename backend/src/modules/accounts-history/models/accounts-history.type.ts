import { ACCOUNT_HISTORY_TYPES } from './accounts-history.constant';

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
  data: IStatistic[];
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
