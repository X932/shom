import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { GuardLayout, MainLayout } from '@ui-layouts';
import { Button, Input, dropdownStyles } from '@components';
import { colors } from '@styles';
import { allowOnlyNumber, httpExceptionHandler } from '@utils';
import { getBranchesAPI } from '@services';
import { IBranch, IList, IResponseWrapper } from '@interfaces';
import { ICreateExpenseForm } from './interface';
import { styles } from './styles';

export const ExpenseCreate = () => {
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState<IList[]>([]);

  useQuery({
    queryKey: ['branches'],
    queryFn: () => getBranchesAPI(),
    onSuccess: (branches: IBranch[]) => {
      const parsedBranches: IList[] = branches.map(({ id, title }) => ({
        value: id,
        label: title,
      }));
      setBranches(parsedBranches);
    },
    onError: (error: AxiosError<IResponseWrapper>) => {
      httpExceptionHandler(error);
    },
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateExpenseForm>({
    defaultValues: {
      description: '',
      branchId: '',
      amount: '',
      createdAt: new Date().toISOString(),
    },
  });

  return (
    <GuardLayout>
      <MainLayout>
        <View style={styles.container}>
          <Button
            label={format(expenseDate, 'dd MMMM yyyy', { locale: ru })}
            onPress={() => setOpen(true)}
            variant="outline"
          />
          <DatePicker
            locale="ru"
            modal
            mode="date"
            open={open}
            date={expenseDate}
            onConfirm={date => {
              setOpen(false);
              setExpenseDate(date);
            }}
            onCancel={() => setOpen(false)}
          />
          <Controller
            name="amount"
            control={control}
            rules={{
              required: 'Обязательное поле',
              pattern: { value: /^\d*$/, message: 'Только цифры' },
            }}
            render={({ field: { onChange, ...props } }) => (
              <Input
                placeholder="Сумма"
                keyboardType="numeric"
                cursorColor={colors.black['100']}
                onChangeText={value => onChange(allowOnlyNumber(value))}
                errorMessage={errors.amount?.message}
                {...props}
              />
            )}
          />

          <Controller
            name="branchId"
            control={control}
            rules={{
              required: 'Выберите место',
            }}
            render={({ field: { onChange, value, onBlur } }) => (
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
                data={branches}
                maxHeight={250}
                labelField="label"
                dropdownPosition="top"
                valueField="value"
                placeholder="Место"
                value={value}
                onBlur={() => {
                  onBlur();
                }}
                onChange={(item: IList) => {
                  onChange(item.value);
                }}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                onChangeText={value => field.onChange(value)}
                placeholder="Описание"
                keyboardType="default"
                cursorColor={colors.black['100']}
                numberOfLines={4}
                textAlignVertical="top"
                errorMessage={errors.description?.message}
                multiline
              />
            )}
          />
        </View>
      </MainLayout>
    </GuardLayout>
  );
};
