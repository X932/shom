import { Button, Input } from '@components';
import { colors } from '@styles';
import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { allowOnlyNumber } from '@utils';
import { pick, types } from 'react-native-document-picker';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { styles } from './styles';
import { createProductAPI } from './service';
import { ICreateProductForm } from './interface';

export const ProductCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateProductForm>({
    defaultValues: {
      title: '',
      description: '',
      details: [
        {
          quantity: '1',
          size: '',
          price: { amount: '' },
        },
      ],
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
    } catch (error) {
      setFile(null);
    }
  };

  const successResponseHandler = () => {
    reset();
    setFile(undefined);
  };

  const submitHandler = (values: ICreateProductForm) => {
    setIsLoading(true);
    createProductAPI({
      product: values,
      setIsLoading: setIsLoading,
      successResponseHandler: successResponseHandler,
      file: file,
    });
  };

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
                uri: file.uri,
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
                name={`details.${index}.quantity`}
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
                      errors.details && errors.details[index]?.quantity?.message
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
                  size: '',
                  quantity: '1',
                  price: {
                    amount: '',
                  },
                });
              }}
              variant="outline"
            />
          </View>
        </View>
        <Button
          label="Создать"
          disabled={isLoading || !isValid || !file}
          onPress={handleSubmit(submitHandler)}
        />
      </View>
    </ScrollView>
  );
};
