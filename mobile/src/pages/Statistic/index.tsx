import { dropdownStyles } from '@components';
import { colors } from '@styles';
import { GuardLayout, MainLayout } from '@ui-layouts';
import { Text, View, useWindowDimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BarChart, barDataItem } from 'react-native-gifted-charts';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { IResponseWrapper } from '@interfaces';
import { httpExceptionHandler } from '@utils';
import { getStatisticAPI } from './service';
import { IStatistic, IStatisticParams, StatisticType } from './interface';
import {
  STATISTIC_COLORS,
  STATISTIC_TYPES,
  Y_AXIS_SECTION_QUANTITY,
} from './constant';
import { styles } from './styles';

export const Statistic = () => {
  const { width } = useWindowDimensions();

  const [params, setParams] = useState<IStatisticParams>({
    currentDate: new Date(),
    type: StatisticType.WEEK,
  });

  const { data: statisticResponse } = useQuery({
    queryKey: ['products', params],
    queryFn: () => getStatisticAPI(params),
    onError: (error: AxiosError<IResponseWrapper>) => {
      httpExceptionHandler(error);
    },
  });

  const roundUpToNearestHundred = (maxAmount = 0) => {
    const roundedAmount = Math.round(maxAmount / Y_AXIS_SECTION_QUANTITY);
    return roundedAmount + (100 - (roundedAmount % 100));
  };

  const stepValue = useMemo(
    () => roundUpToNearestHundred(statisticResponse?.maxAmount),
    [statisticResponse?.maxAmount],
  );

  const getYAxisLabels = (stepValue: number): string[] => {
    return [0, 1, 2, 3, 4, 5].map(stepIndex => {
      return `${stepIndex * stepValue}`;
    });
  };
  const yAxisLabels = useMemo(() => getYAxisLabels(stepValue), [stepValue]);

  const parseStatistic = (
    statistic: IStatistic[] | undefined,
  ): barDataItem[] | undefined => {
    return statistic?.map((statistic, index) => {
      const isExpense = index % 2;
      return {
        value: statistic.amount,
        spacing: isExpense ? 36 : 6,
        label: isExpense ? undefined : statistic.period,
        frontColor: isExpense
          ? STATISTIC_COLORS.EXPENSE[0]
          : STATISTIC_COLORS.INCOME[0],
        gradientColor: isExpense
          ? STATISTIC_COLORS.EXPENSE[1]
          : STATISTIC_COLORS.INCOME[1],
      };
    });
  };

  const parsedStatistic = useMemo(
    () => parseStatistic(statisticResponse?.data),
    [statisticResponse?.data],
  );

  return (
    <GuardLayout>
      <MainLayout>
        <View style={styles.container}>
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
            onChange={item => {
              setParams({
                type: item.value,
                currentDate: new Date(),
              });
            }}
          />

          <View style={styles.chartContainer}>
            <BarChart
              data={parsedStatistic}
              renderTooltip={(item: barDataItem) => (
                <View style={styles.tooltipContainer}>
                  <Text style={{ color: colors.black['100'] }}>
                    {item.value}
                  </Text>
                </View>
              )}
              leftShiftForTooltip={8}
              leftShiftForLastIndexTooltip={8}
              barWidth={20}
              width={width - 100}
              endSpacing={8}
              initialSpacing={8}
              barBorderTopLeftRadius={4}
              barBorderTopRightRadius={4}
              yAxisAtTop
              showGradient
              yAxisThickness={0}
              xAxisColor={colors.white}
              yAxisTextStyle={{ color: colors.white }}
              stepValue={stepValue}
              maxValue={stepValue * Y_AXIS_SECTION_QUANTITY + stepValue}
              noOfSections={Y_AXIS_SECTION_QUANTITY}
              yAxisLabelTexts={yAxisLabels}
              labelWidth={68}
              xAxisLabelTextStyle={{ color: colors.white }}
            />
          </View>
        </View>
      </MainLayout>
    </GuardLayout>
  );
};
