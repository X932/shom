import { IAccount } from '@interfaces';

export enum StatisticType {
  WEEK = '7',
  MONTH = '5',
  YEAR = '12',
}

export enum ACCOUNT_HISTORY_TYPES {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface IStatisticParams {
  currentDate: string;
  type: StatisticType;
}

export interface IStatistic {
  amount: number;
  period: string;
  type: ACCOUNT_HISTORY_TYPES;
}

interface IAccountHistory {
  id: number;
  amount: number;
  type: ACCOUNT_HISTORY_TYPES;
  description: string;
  createdAt: Date;
  account: IAccount;
}

export interface IStatisticResponse {
  maxAmount: number;
  statistic: IStatistic[];
  accountsHistory: IAccountHistory[];
}
