import { Button, Input } from '@components';
import { colors } from '@styles';
import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { showErrorToast } from '@utils';
import { pick, types } from 'react-native-document-picker';
import { validationSchema } from './validationSchema';
import { styles } from './styles';
import { createProductAPI } from './service';

export const ProductCreate = () => {
  const [formData, setFormData] = useState(validationSchema);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>();

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
    setFormData(validationSchema);
  };

  const submitHandler = () => {
    if (
      formData.title.isValid &&
      formData.description.isValid &&
      formData.price.isValid &&
      formData.size.isValid
    ) {
      setIsLoading(true);
      createProductAPI({
        title: formData.title.value,
        description: formData.description.value,
        price: Number(formData.price.value),
        size: Number(formData.size.value),
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
        <Input
          formData={formData}
          setFormData={setFormData}
          inputKey="title"
          label="Название"
          keyboardType="default"
          cursorColor={colors.black[100]}
        />
        <Input
          formData={formData}
          setFormData={setFormData}
          inputKey="description"
          label="Описание"
          keyboardType="default"
          cursorColor={colors.black[100]}
          numberOfLines={4}
          textAlignVertical="top"
          multiline
        />
        <View style={styles.productTypesContainer}>
          <Input
            formData={formData}
            setFormData={setFormData}
            inputKey="size"
            label="Размер"
            keyboardType="numeric"
            cursorColor={colors.black[100]}
          />
          <Input
            formData={formData}
            setFormData={setFormData}
            inputKey="price"
            label="Цена"
            keyboardType="numeric"
            cursorColor={colors.black[100]}
          />
        </View>
        <Button label="Создать" disabled={isLoading} onPress={submitHandler} />
      </View>
    </ScrollView>
  );
};
