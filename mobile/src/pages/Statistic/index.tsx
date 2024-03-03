import { dropdownStyles } from '@components';
import { colors } from '@styles';
import { MainLayout } from '@ui-layouts';
import {
  ActivityIndicator,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BarChart, barDataItem } from 'react-native-gifted-charts';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { IResponseWrapper } from '@interfaces';
import { httpExceptionHandler } from '@utils';
import { format } from 'date-fns';
import { getStatisticAPI } from './service';
import { IStatisticParams, StatisticType } from './interface';
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

  const {
    data: statisticResponse,
    isFetching,
    isLoading,
  } = useQuery({
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

  const stepValue = roundUpToNearestHundred(statisticResponse?.totalAmount);

  const getYAxisLabels = (stepValue: number): string[] => {
    return Array(Y_AXIS_SECTION_QUANTITY).map(stepIndex => {
      return `${stepIndex * stepValue}`;
    });
  };

  const parseData = (): barDataItem[] | undefined => {
    return statisticResponse?.data.map((statistic, index) => {
      const isExpense = index % 2;
      return {
        value: statistic.amount,
        spacing: isExpense ? 36 : 6,
        label: isExpense
          ? undefined
          : format(statistic.createdAt, 'dd.MM.yyyy'),
        frontColor: isExpense
          ? STATISTIC_COLORS.EXPENSE[0]
          : STATISTIC_COLORS.INCOME[0],
        gradientColor: isExpense
          ? STATISTIC_COLORS.EXPENSE[1]
          : STATISTIC_COLORS.INCOME[1],
      };
    });
  };

  if (isFetching && isLoading) {
    return <ActivityIndicator color={colors.blue['100']} size="large" />;
  }

  return (
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
            setParams({ type: item.value, currentDate: new Date() });
          }}
        />

        <View style={styles.chartContainer}>
          <BarChart
            data={parseData()}
            renderTooltip={(item: barDataItem) => (
              <View style={styles.tooltipContainer}>
                <Text style={{ color: colors.black['100'] }}>{item.value}</Text>
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
            maxValue={(statisticResponse?.totalAmount || 0) + stepValue}
            noOfSections={Y_AXIS_SECTION_QUANTITY}
            yAxisLabelTexts={getYAxisLabels(
              statisticResponse?.totalAmount || 0,
            )}
            labelWidth={68}
            xAxisLabelTextStyle={{ color: colors.white }}
          />
        </View>
      </View>
    </MainLayout>
  );
};
