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

export interface IStatisticResponse {
  maxAmount: number;
  data: IStatistic[];
}
