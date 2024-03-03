export enum StatisticType {
  WEEK = '7',
  MONTH = '5',
  YEAR = '12',
}

export interface IStatisticParams {
  currentDate: Date;
  type: StatisticType;
}

interface IStatistic {
  amount: number;
  createdAt: Date;
}

export interface IStatisticResponse {
  totalAmount: number;
  data: IStatistic[];
}
