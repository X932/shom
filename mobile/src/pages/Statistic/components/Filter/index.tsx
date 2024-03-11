import { Dropdown } from 'react-native-element-dropdown';
import { FC, useEffect, useState } from 'react';
import { addMonths, addWeeks, endOfWeek, format, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import { dropdownStyles } from '@components';
import { IFilterPeriod, IFilterProps, IFilterType } from './interface';
import { STATISTIC_TYPES } from '../../constant';
import { StatisticType } from '../../interface';

const MONDAY_INDEX = 1;
const MAX_WEEK_PERIODS = 20;
const MAX_MONTH_PERIODS = 10;

export const Filter: FC<IFilterProps> = ({ params, setParams }) => {
  const [periods, setPeriods] = useState<IFilterPeriod[]>([]);

  const getNewPeriods = (type: StatisticType) => {
    const newPeriods: IFilterPeriod[] = [];

    if (type === StatisticType.WEEK) {
      for (let index = 0; index < MAX_WEEK_PERIODS; index++) {
        const date = addWeeks(new Date(), -index);

        newPeriods.push({
          label: `${format(
            startOfWeek(date, { weekStartsOn: MONDAY_INDEX }),
            'dd.MM.yy',
          )}-${format(
            endOfWeek(date, { weekStartsOn: MONDAY_INDEX }),
            'dd.MM.yy',
          )}`,
          value: date.toISOString(),
        });
      }
    } else {
      for (let index = 0; index < MAX_MONTH_PERIODS; index++) {
        const date = addMonths(new Date(), -index);

        newPeriods.push({
          label: format(date, 'LLLL yyyy', { locale: ru }),
          value: date.toISOString(),
        });
      }
    }

    return newPeriods;
  };

  const typeHandler = (type: IFilterType) => {
    const newPeriods: IFilterPeriod[] = getNewPeriods(type.value);

    setPeriods(newPeriods);
    setParams({
      type: type.value,
      currentDate: newPeriods[0].value,
    });
  };

  useEffect(() => {
    const newPeriods: IFilterPeriod[] = getNewPeriods(params.type);

    setPeriods(newPeriods);
    setParams({
      type: params.type,
      currentDate: newPeriods[0].value,
    });
  }, []);

  return (
    <>
      <Dropdown
        style={[dropdownStyles.dropdown]}
        placeholderStyle={dropdownStyles.dropdownText}
        selectedTextStyle={dropdownStyles.dropdownText}
        inputSearchStyle={[
          dropdownStyles.inputSearch,
          dropdownStyles.dropdownText,
        ]}
        containerStyle={dropdownStyles.listContainer}
        backgroundColor={'#c8c4c452'}
        data={STATISTIC_TYPES}
        maxHeight={250}
        labelField="label"
        dropdownPosition="top"
        valueField="value"
        placeholder="Тип"
        value={params.type}
        onChange={item => typeHandler(item)}
      />

      <Dropdown
        style={[dropdownStyles.dropdown]}
        placeholderStyle={dropdownStyles.dropdownText}
        selectedTextStyle={dropdownStyles.dropdownText}
        inputSearchStyle={[
          dropdownStyles.inputSearch,
          dropdownStyles.dropdownText,
        ]}
        containerStyle={dropdownStyles.listContainer}
        backgroundColor={'#c8c4c452'}
        data={periods}
        maxHeight={250}
        labelField="label"
        dropdownPosition="top"
        valueField="value"
        placeholder="Период"
        value={params.currentDate}
        onChange={item =>
          setParams(previousParams => ({
            ...previousParams,
            currentDate: item.value,
          }))
        }
      />
    </>
  );
};
