export enum StatisticType {
  WEEK = '7',
  MONTH = '5',
  YEAR = '12',
}

export interface IStatisticParams {
  currentDate: string;
  type: StatisticType;
}

export interface IStatistic {
  amount: number;
  period: string;
}

export interface IStatisticResponse {
  maxAmount: number;
  data: IStatistic[];
}
