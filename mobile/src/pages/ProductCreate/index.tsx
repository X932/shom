import { Button, Input } from '@components';
import { colors } from '@styles';
import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { allowOnlyNumber, showErrorToast } from '@utils';
import { pick, types } from 'react-native-document-picker';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { styles } from './styles';
import { createProductAPI } from './service';
import { ICreateProductForm } from './interface';

export const ProductCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
      details: [
        {
          size: '',
          price: { amount: '' },
        },
      ],
    },
  });
  const { fields } = useFieldArray({
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
  };

  const submitHandler = (values: ICreateProductForm) => {
    console.log(values);
    console.log(values.details);

    if (values.title && values.description) {
      setIsLoading(true);
      createProductAPI({
        product: values,
        setIsLoading: setIsLoading,
        successResponseHandler: successResponseHandler,
        file: file,
      });
    } else {
      showErrorToast('Данные не верные');
    }
  };

  return (
    <ScrollView style={styles.viewContainer}>
      <View style={styles.formContainer}>
        <Button
          label="Выбрать фото"
          disabled={isLoading}
          onPress={selectFile}
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
          render={({ field }) => (
            <Input
              {...field}
              onChangeText={value => field.onChange(value)}
              placeholder="Название"
              keyboardType="default"
              cursorColor={colors.black[100]}
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
              cursorColor={colors.black[100]}
              numberOfLines={4}
              textAlignVertical="top"
              multiline
            />
          )}
        />
        <View style={styles.productTypesContainer}>
          {fields.map((field, index) => (
            <View key={field.id}>
              <Controller
                name={`details.${index}.size`}
                control={control}
                render={({ field: { onChange, ...props } }) => (
                  <Input
                    placeholder="Размер"
                    keyboardType="numeric"
                    cursorColor={colors.black[100]}
                    onChangeText={value => onChange(allowOnlyNumber(value))}
                    {...props}
                  />
                )}
              />
              <Controller
                name={`details.${index}.price.amount`}
                control={control}
                render={({ field: { onChange, ...props } }) => (
                  <Input
                    placeholder="Цена"
                    keyboardType="numeric"
                    cursorColor={colors.black[100]}
                    onChangeText={value => onChange(allowOnlyNumber(value))}
                    {...props}
                  />
                )}
              />
            </View>
          ))}
        </View>
        <Button
          label="Создать"
          disabled={isLoading}
          onPress={handleSubmit(submitHandler)}
        />
      </View>
    </ScrollView>
  );
};
