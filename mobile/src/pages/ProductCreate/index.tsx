import { Button, Input } from '@components';
import { colors } from '@styles';
import { useState } from 'react';
import { View } from 'react-native';
import { showErrorToast } from '@utils';
import { validationSchema } from './validationSchema';
import { styles } from './styles';
import { createProductAPI } from './service';

export const ProductCreate = () => {
  const [formData, setFormData] = useState(validationSchema);
  const [isLoadind, setIsLoadind] = useState(false);
  // const [photo, setPhoto] = useState<Asset | undefined>();

  // const createFormData = (photo: any, body: Record<string, any> = {}) => {
  //   const data = new FormData();
  //   data.append('photo', photo);

  //   Object.keys(body).forEach(key => {
  //     data.append(key, body[key]);
  //   });
  //   return data;
  // };

  // const choosePhotoHandler = (response: ImagePickerResponse) => {
  //   if (response.assets && response.assets?.length > 0) {
  //     setPhoto(response.assets[0]);
  //     createFormData(response.assets[0], { userId: '123' });
  //   }
  // };

  // const handleUploadPhoto = () => {
  //   //////////// create route
  //   axiosInstance(`/api/upload`, {
  //     method: 'POST',
  //     data: createFormData(photo, { userId: '123' }),
  //   })
  //     .then(response => {
  //       console.log('response', response.data);
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  // };

  const submitHandler = () => {
    if (
      formData.title.isValid &&
      formData.description.isValid &&
      formData.price.isValid &&
      formData.imgPath.isValid &&
      formData.size.isValid
    ) {
      setIsLoadind(true);
      createProductAPI({
        title: formData.title.value,
        description: formData.description.value,
        imgPath: formData.imgPath.value,
        price: Number(formData.price.value),
        size: Number(formData.size.value),
        setIsLoadind: setIsLoadind,
      });
    } else {
      showErrorToast('Данные не верные');
    }
  };

  return (
    <View style={styles.inputsContainer}>
      {/* <Button
        label="Choose Photo"
        onPress={() => {
          launchImageLibrary({ mediaType: 'photo' }, choosePhotoHandler);
        }}
      />
      <Button
        label="Take Photo"
        onPress={() => {
          launchCamera(
            { mediaType: 'photo', saveToPhotos: true },
            choosePhotoHandler,
          );
        }}
      /> */}
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
      <Button label="Создать" disabled={isLoadind} onPress={submitHandler} />
    </View>
  );
};
