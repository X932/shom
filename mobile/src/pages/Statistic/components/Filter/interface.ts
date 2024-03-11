import { SetStateAction } from 'react';
import { IStatisticParams, StatisticType } from '../../interface';

export interface IFilterProps {
  setParams: (value: SetStateAction<IStatisticParams>) => void;
  params: IStatisticParams;
}

export interface IFilterType {
  label: string;
  value: StatisticType;
}

export interface IFilterPeriod {
  label: string;
  value: string;
}
