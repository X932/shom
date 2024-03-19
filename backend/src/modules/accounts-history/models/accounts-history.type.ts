export interface IStatistic {
  amount: number;
  period: string;
}

export interface IStatisticResponse {
  maxAmount: number;
  data: IStatistic[];
}

export interface IWeeklyStatisticQueryResult {
  amount: number;
  createdAt: Date;
}

export interface IMonthlyStatisticQueryResult {
  amount: number;
  weekNumber: number;
}
