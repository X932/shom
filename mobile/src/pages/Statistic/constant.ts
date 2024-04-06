import { StatisticType } from './interface';

export const STATISTIC_COLORS = {
  INCOME: ['#006DFF', '#009FFF'],
  EXPENSE: ['#F39897', '#ED6665'],
};

export const STATISTIC_TYPES = [
  {
    value: StatisticType.WEEK,
    label: 'Неделя',
  },
  {
    value: StatisticType.MONTH,
    label: 'Месяц',
  },
  // { TODO add in backend
  //   value: StatisticType.YEAR,
  //   label: 'Год',
  // },
];

export const Y_AXIS_SECTION_QUANTITY = 6;
