import { Button, dropdownStyles, Input } from '@components';
import { colors } from '@styles';
import { FC, useCallback, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { allowOnlyNumber } from '@utils';
import { pick, types } from 'react-native-document-picker';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { IList, PrivateNavigatorScreenProps, IProduct } from '@interfaces';
import { useFocusEffect } from '@react-navigation/native';
import { MEDIA_BASE_URL } from '@env';
import { Dropdown } from 'react-native-element-dropdown';
import { getBranchesAPI } from '@services';
import { GuardLayout } from '@ui-layouts';
import { getProductAPI } from '../ProductView/service';
import { styles } from './styles';
import { updateProductAPI } from './service';
import { IUpdateDetail, IUpdateProductForm } from './interface';

export const ProductUpdate: FC<PrivateNavigatorScreenProps> = ({
  route,
  navigation,
}) => {
  const { id: productID } = route.params as Pick<IProduct, 'id'>;

  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const [branches, setBranches] = useState<IList[]>([]);

  const setDefaultFormValue = (product: IProduct) => {
    return {
      ...product,
      details: product.details.map<IUpdateDetail>(detail => ({
        id: detail.id,
        size: String(detail.size),
        inventory: {
          ...detail.inventory,
          branchId: String(detail.inventory.branch.id),
          quantity: String(detail.inventory.quantity),
        },
        price: {
          id: detail.price.id,
          amount: String(detail.price.amount),
        },
      })),
    };
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IUpdateProductForm>({
    defaultValues: {},
  });
  const { fields, append, remove } = useFieldArray({
    name: 'details',
    control: control,
    rules: { minLength: 1 },
  });

  const selectFile = async () => {
    try {
      const res = await pick({
        type: [types.images],
      });
      setFile(res[0]);
    } catch {
      setFile(null);
    }
  };

  const redirectToViewProduct = (product: IProduct) => {
    navigation.navigate('ProductView', product);
  };

  const successResponseHandler = (id: number) => {
    getProductAPI({
      setIsLoading: setIsLoading,
      successResponseHandler: product => redirectToViewProduct(product),
      id: id,
    });
  };

  const submitHandler = (values: IUpdateProductForm) => {
    setIsLoading(true);
    updateProductAPI({
      product: values,
      setIsLoading: setIsLoading,
      successResponseHandler: successResponseHandler,
      image: file,
      oldImagePath: product?.imgPath || '',
    });
  };

  const getImageUri = (uri: string) => {
    if (uri.includes('files/')) {
      return MEDIA_BASE_URL + uri;
    }

    return uri;
  };

  const getInitialData = async () => {
    const data = await getBranchesAPI();

    if (data) {
      const parsedBranches: IList[] = data.map(({ id, title }) => ({
        value: id,
        label: title,
      }));
      setBranches(parsedBranches);
    }

    getProductAPI({
      id: productID,
      setIsLoading: setIsLoading,
      successResponseHandler: product => {
        setFile({ uri: product.imgPath });
        reset(setDefaultFormValue(product));
        setProduct(product);
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      getInitialData();

      return () => {
        reset();
        setFile(undefined);
      };
    }, [productID]),
  );

  return (
    <GuardLayout>
      <ScrollView style={styles.viewContainer}>
        <View style={styles.formContainer}>
          <Button
            label="Выбрать фото"
            disabled={isLoading}
            onPress={selectFile}
            variant="outline"
          />

          {file?.uri && (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: getImageUri(file.uri),
                }}
              />
            </View>
          )}
          <View style={styles.productTypesContainer}>
            <Text style={{ textAlign: 'left' }}>Название</Text>
            <Controller
              name="title"
              control={control}
              rules={{
                required: { value: true, message: 'Обязательное поле' },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  onChangeText={value => field.onChange(value)}
                  placeholder="Название"
                  keyboardType="default"
                  cursorColor={colors.black['100']}
                  errorMessage={errors.title?.message}
                />
              )}
            />
          </View>
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
          <View style={styles.productTypesContainer}>
            {fields.map((field, index) => (
              <View style={styles.productType} key={field.id}>
                <Controller
                  name={`details.${index}.inventory.quantity`}
                  control={control}
                  rules={{
                    required: { value: true, message: 'Обязательное поле' },
                    pattern: { value: /^\d*$/, message: 'Только цифры' },
                  }}
                  render={({ field: { onChange, ...props } }) => (
                    <Input
                      placeholder="Количество"
                      keyboardType="numeric"
                      cursorColor={colors.black['100']}
                      onChangeText={value => onChange(allowOnlyNumber(value))}
                      errorMessage={
                        errors.details &&
                        errors.details[index]?.inventory?.quantity?.message
                      }
                      {...props}
                    />
                  )}
                />
                <Controller
                  name={`details.${index}.size`}
                  control={control}
                  rules={{
                    required: { value: true, message: 'Обязательное поле' },
                    pattern: { value: /^\d*$/, message: 'Только цифры' },
                  }}
                  render={({ field: { onChange, ...props } }) => (
                    <Input
                      placeholder="Размер"
                      keyboardType="numeric"
                      cursorColor={colors.black['100']}
                      onChangeText={value => onChange(allowOnlyNumber(value))}
                      errorMessage={
                        errors.details && errors.details[index]?.size?.message
                      }
                      {...props}
                    />
                  )}
                />
                <Controller
                  name={`details.${index}.price.amount`}
                  control={control}
                  rules={{
                    required: { value: true, message: 'Обязательное поле' },
                    pattern: { value: /^\d*$/, message: 'Только цифры' },
                  }}
                  render={({ field: { onChange, ...props } }) => (
                    <Input
                      placeholder="Цена"
                      keyboardType="numeric"
                      cursorColor={colors.black['100']}
                      onChangeText={value => onChange(allowOnlyNumber(value))}
                      errorMessage={
                        errors.details &&
                        errors.details[index]?.price?.amount?.message
                      }
                      {...props}
                    />
                  )}
                />

                <View style={dropdownStyles.dropdownContainer}>
                  <Controller
                    name={`details.${index}.inventory.branchId`}
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
                        search
                        maxHeight={250}
                        labelField="label"
                        valueField="value"
                        dropdownPosition="top"
                        placeholder={
                          branches.find(branch => branch.value === +value)
                            ?.label || 'Место'
                        }
                        searchPlaceholder="Поиск..."
                        value={value}
                        onBlur={() => onBlur()}
                        onChange={item => {
                          onChange(item.value);
                        }}
                      />
                    )}
                  />
                </View>

                <View style={styles.actionTypeButton}>
                  <Button
                    label="-"
                    onPress={() => {
                      remove(index);
                    }}
                    variant="danger"
                  />
                </View>
              </View>
            ))}

            <View style={styles.actionTypeButton}>
              <Button
                label="+"
                onPress={() => {
                  append({
                    price: {
                      amount: '',
                    },
                    size: '',
                    inventory: {
                      quantity: '1',
                      branchId: '',
                    },
                  });
                }}
                variant="outline"
              />
            </View>
          </View>
          <Button
            label="Сохранить"
            disabled={isLoading || !isValid || !file}
            onPress={handleSubmit(submitHandler)}
          />
          <Button
            label="Отменить"
            onPress={() => redirectToViewProduct(product as IProduct)}
            variant="outline"
          />
        </View>
      </ScrollView>
    </GuardLayout>
  );
};
