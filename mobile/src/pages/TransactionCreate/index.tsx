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
import { IAccount, IList, IResponseWrapper } from '@interfaces';
import { getAccountsAPI } from '@services';
import { ITransactionCreateForm } from './interface';
import { styles } from './styles';
import { TRANSACTION_TYPES } from './constant';
import { createTransactionAPI } from './service';
import { ACCOUNT_HISTORY_TYPES } from '../Statistic/interface';

export const TransactionCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState<IList[]>([]);

  useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAccountsAPI(),
    onSuccess: (accounts: IAccount[]) => {
      const parsedAccounts: IList[] = accounts.map(({ id, title }) => ({
        value: id,
        label: title,
      }));
      setAccounts(parsedAccounts);
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
  } = useForm<ITransactionCreateForm>({
    defaultValues: {
      description: '',
      accountId: '',
      amount: '',
      createdAt: new Date(),
      type: ACCOUNT_HISTORY_TYPES.EXPENSE,
    },
  });

  const successResponseHandler = () => {
    reset();
    setTransactionDate(new Date());
  };

  const submitHandler = (values: ITransactionCreateForm) => {
    setIsLoading(true);
    createTransactionAPI({
      payload: {
        ...values,
        createdAt: transactionDate,
      },
      setIsLoading: setIsLoading,
      successResponseHandler: successResponseHandler,
    });
  };

  return (
    <GuardLayout>
      <MainLayout>
        <View style={styles.container}>
          <Button
            label={format(transactionDate, 'dd MMMM yyyy', { locale: ru })}
            onPress={() => setOpen(true)}
            variant="outline"
          />
          <DatePicker
            locale="ru"
            modal
            mode="date"
            open={open}
            date={transactionDate}
            onConfirm={date => {
              setOpen(false);
              setTransactionDate(date);
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
            name="accountId"
            control={control}
            rules={{
              required: 'Выберите счёт',
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
                data={accounts}
                maxHeight={250}
                labelField="label"
                dropdownPosition="top"
                valueField="value"
                placeholder="Счёт"
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
            name="type"
            control={control}
            rules={{
              required: 'Выберите тип',
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
                data={TRANSACTION_TYPES}
                maxHeight={250}
                labelField="label"
                dropdownPosition="top"
                valueField="value"
                placeholder="Тип"
                value={value}
                onBlur={() => {
                  onBlur();
                }}
                onChange={(item: IList<string>) => {
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
          <Button
            label="Добавить"
            disabled={isLoading || !isValid}
            onPress={handleSubmit(submitHandler)}
          />
        </View>
      </MainLayout>
    </GuardLayout>
  );
};
