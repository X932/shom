import { Button, Input } from '@components';
import { colors } from '@styles';
import { FC, useCallback, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { allowOnlyNumber } from '@utils';
import { pick, types } from 'react-native-document-picker';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { PrivateNavigatorScreenProps } from '@interfaces';
import { useFocusEffect } from '@react-navigation/native';
import { MEDIA_BASE_URL } from '@env';
import { IProduct } from '../ProductsList/interface';
import { getProductsAPI } from '../ProductsList/service';
import { styles } from './styles';
import { updateProductAPI } from './service';
import { IUpdateDetail, IUpdateProductForm } from './interface';

export const ProductUpdate: FC<PrivateNavigatorScreenProps> = ({
  route,
  navigation,
}) => {
  const product = route.params as IProduct;
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      ...product,
      details: product.details.map<IUpdateDetail>(detail => ({
        id: detail.id,
        size: String(detail.size),
        price: {
          id: detail.price.id,
          amount: String(detail.price.amount),
        },
      })),
    },
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

  const successResponseHandler = () => {
    getProductsAPI({
      setIsLoading: setIsLoading,
      successResponseHandler: products => redirectToViewProduct(products[0]),
    });
  };

  const submitHandler = (values: IUpdateProductForm) => {
    setIsLoading(true);
    updateProductAPI({
      product: values,
      setIsLoading: setIsLoading,
      successResponseHandler: successResponseHandler,
      file: file,
    });
  };

  const getImageUri = (uri: string) => {
    if (uri.includes('files/')) {
      return MEDIA_BASE_URL + uri;
    }

    return uri;
  };

  useFocusEffect(
    useCallback(() => {
      setFile({ uri: product.imgPath });
    }, [product.imgPath]),
  );

  return (
    <ScrollView style={styles.viewContainer}>
      <View style={styles.formContainer}>
        <Button
          label="Выбрать фото"
          disabled={isLoading}
          onPress={selectFile}
          variant="outline"
        />

        {file && (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: getImageUri(file.uri),
              }}
            />
          </View>
        )}
        <Controller
          name="title"
          control={control}
          rules={{ required: { value: true, message: 'Обязательное поле' } }}
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
                append({ price: { amount: '' }, size: '' });
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
      </View>
    </ScrollView>
  );
};
