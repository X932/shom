import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Button, dropdownStyles, Input } from '@components';
import { MainLayout } from '@ui-layouts';
import { Dropdown } from 'react-native-element-dropdown';
import { getAccountsAPI } from '@services';
import { IList } from '@interfaces';
import { colors } from '@styles';
import { allowOnlyNumber, showErrorToast } from '@utils';
import { IProduct } from '../ProductsList/interface';
import { getProductsAPI } from '../ProductsList/service';
import { styles } from './styles';
import { saleProducts } from './service';
import { IOrderDetails, ISaleForm } from './interface';
import { ProductsList } from './components/ProductsList';
import { ISelectedProduct } from './components/SelectedProductCard/interface';

export const Sales = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProduct[]>(
    [],
  );
  const [showProductsList, setShowProductsList] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [accounts, setAccounts] = useState<IList[]>([]);

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

  const successResponseHandler = (data: IProduct[]) => {
    setProducts(data);
    setIsLoading(false);
  };

  const resetForm = () => {
    reset();
    setSelectedProducts([]);
  };

  const getSelectedProductsQuantity = (
    selectedProducts: ISelectedProduct[],
  ): number => {
    let totalCount = 0;
    selectedProducts.forEach(({ quantity }) => {
      totalCount += quantity;
    });
    return totalCount;
  };

  const parseOrderDetails = (): IOrderDetails[] =>
    selectedProducts.map(({ productDetailsId, productId, quantity }) => ({
      productDetailsId: productDetailsId,
      productId: productId,
      quantity: quantity,
    }));

  const submitHandler = (values: ISaleForm): void => {
    setIsLoading(true);

    if (!Number(values.accountId) || !Number(values.discount)) {
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
        details: parseOrderDetails(),
      },
      setIsLoading: setIsLoading,
      successResponseHandler: () => {
        resetForm();
        getProducts();
      },
    });
  };

  const getAccounts = async (): Promise<void> => {
    const data = await getAccountsAPI();

    if (data) {
      const parsedAccounts: IList[] = data.map(({ id, title }) => ({
        value: id,
        label: title,
      }));
      setAccounts(parsedAccounts);
    }
  };

  const getProducts = async (): Promise<void> => {
    getProductsAPI({
      successResponseHandler: successResponseHandler,
      setIsLoading: setIsLoading,
    });
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
      getAccounts();

      return () => {
        resetForm();
      };
    }, []),
  );

  return (
    <MainLayout>
      <SafeAreaView style={styles.viewContainer}>
        {showProductsList && !isLoading ? (
          <>
            <Button
              label="Готово"
              onPress={() => setShowProductsList(false)}
              variant="outline"
            />
            <ProductsList
              products={products}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              getSelectedProductsQuantity={getSelectedProductsQuantity}
            />
          </>
        ) : (
          <View style={{ flex: 1, gap: 16 }}>
            <Button
              label="Выбрать продукты"
              disabled={false}
              onPress={() => setShowProductsList(true)}
              variant="outline"
            />
            <Text style={styles.ordersQuantityLabel}>
              Выбрано продуктов: {getSelectedProductsQuantity(selectedProducts)}
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
                  search
                  maxHeight={250}
                  labelField="label"
                  dropdownPosition="top"
                  valueField="value"
                  placeholder={'Метод оплаты'}
                  renderInputSearch={() => <></>}
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
              rules={{
                required: 'Обязательное поле',
                pattern: { value: /^\d*$/, message: 'Только цифры' },
              }}
              render={({ field: { onChange, ...props } }) => (
                <Input
                  placeholder="Сумма скидки"
                  keyboardType="numeric"
                  cursorColor={colors.black['100']}
                  onChangeText={value => onChange(allowOnlyNumber(value))}
                  errorMessage={errors.discount?.message}
                  {...props}
                />
              )}
            />

            <Button
              label="Продать"
              disabled={isLoading || !isValid || !selectedProducts.length}
              onPress={handleSubmit(submitHandler)}
            />
          </View>
        )}
      </SafeAreaView>
    </MainLayout>
  );
};
