import { IList } from '@interfaces';
import { ACCOUNT_HISTORY_TYPES } from '../Statistic/interface';

export const TRANSACTION_TYPES: IList<string>[] = [
  {
    label: 'Расход',
    value: ACCOUNT_HISTORY_TYPES.EXPENSE,
  },
  {
    label: 'Доход',
    value: ACCOUNT_HISTORY_TYPES.INCOME,
  },
];
