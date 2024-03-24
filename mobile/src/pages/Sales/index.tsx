import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Button, dropdownStyles, Input } from '@components';
import { GuardLayout, MainLayout } from '@ui-layouts';
import { getAccountsAPI } from '@services';
import { IAccount, IList, IResponseWrapper } from '@interfaces';
import { colors } from '@styles';
import { allowOnlyNumber, httpExceptionHandler, showErrorToast } from '@utils';
import { styles } from './styles';
import { saleProducts } from './service';
import { IOrderDetails, ISaleForm, ITotalProductsData } from './interface';
import { ProductsList } from './components/ProductsList';
import { ISelectedProduct } from './components/SelectedProductCard/interface';

export const Sales = () => {
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProduct[]>(
    [],
  );
  const [showProductsList, setShowProductsList] = useState(false);
  const [accounts, setAccounts] = useState<IList[]>([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const getTotalSelectedProductsData = (): ITotalProductsData => {
    let totalCount = 0;
    let totalPriceAmount = 0;
    selectedProducts.forEach(({ quantity, priceAmount }) => {
      totalCount += quantity;
      totalPriceAmount += priceAmount * quantity;
    });

    return {
      totalCount: totalCount,
      totalPriceAmount: totalPriceAmount,
    };
  };

  const totalSelectedProductsData = useMemo(getTotalSelectedProductsData, [
    selectedProducts,
  ]);

  const {
    control,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ISaleForm>({
    defaultValues: {
      accountId: '',
      discount: '',
    },
  });

  const resetForm = () => {
    reset();
    setSelectedProducts([]);
    setDiscountAmount(0);
  };

  const parseOrderDetails = (): IOrderDetails[] =>
    selectedProducts.map(({ productDetailsId, productId, quantity }) => ({
      productDetailsId: productDetailsId,
      productId: productId,
      quantity: quantity,
    }));

  const submitHandler = (values: ISaleForm): void => {
    setIsLoading(true);

    const discountAmount = Number(values.discount) ? values.discount : '0';

    if (!Number(values.accountId) || isNaN(+discountAmount)) {
      showErrorToast('Данные не верные');
      return;
    }

    if (!selectedProducts.length) {
      showErrorToast('Продукт не выбран');
      return;
    }

    saleProducts({
      order: {
        ...values,
        discount: discountAmount,
        details: parseOrderDetails(),
      },
      setIsLoading: setIsLoading,
      successResponseHandler: () => {
        resetForm();
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetForm();
      };
    }, []),
  );

  return (
    <GuardLayout>
      <MainLayout>
        <SafeAreaView style={styles.viewContainer}>
          {showProductsList ? (
            <>
              <Button
                label="Готово"
                onPress={() => setShowProductsList(false)}
                variant="outline"
              />
              <ProductsList
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                totalSelectedProductsData={totalSelectedProductsData}
              />
            </>
          ) : (
            <View style={styles.saleFormContainer}>
              <Button
                label="Выбрать продукты"
                disabled={false}
                onPress={() => setShowProductsList(true)}
                variant="outline"
              />
              <Text style={[styles.textBlack, styles.textStyle]}>
                Выбрано продуктов: {totalSelectedProductsData.totalCount} шт
              </Text>
              <Text style={[styles.textBlack, styles.textStyle]}>
                Сумма продуктов: {totalSelectedProductsData.totalPriceAmount}{' '}
                сом
              </Text>
              <Controller
                name="accountId"
                control={control}
                rules={{
                  required: 'Выберите место',
                }}
                render={({ field: { onChange, value } }) => (
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
                    placeholder={'Метод оплаты'}
                    value={value}
                    onChange={item => {
                      onChange(item.value);
                    }}
                  />
                )}
              />

              <Controller
                name="discount"
                control={control}
                render={({ field: { onChange, ...props } }) => (
                  <Input
                    placeholder="Сумма скидки"
                    keyboardType="numeric"
                    cursorColor={colors.black['100']}
                    onChangeText={value => {
                      onChange(allowOnlyNumber(value));
                      setDiscountAmount(Number(allowOnlyNumber(value)));
                    }}
                    errorMessage={errors.discount?.message}
                    {...props}
                  />
                )}
              />

              <Text style={[styles.textBlack, styles.textStyle]}>
                Итого:{' '}
                {totalSelectedProductsData.totalPriceAmount -
                  Number(discountAmount)}{' '}
                сом
              </Text>

              <Button
                label="Продать"
                disabled={isLoading || !isValid || !selectedProducts.length}
                onPress={handleSubmit(submitHandler)}
              />
            </View>
          )}
        </SafeAreaView>
      </MainLayout>
    </GuardLayout>
  );
};
