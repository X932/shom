import { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { AuthLayout } from '@ui-layouts';
import { Button, Input } from '@components';
import { colors } from '@styles';
import { PublicNavigatorScreenProps } from '@interfaces';
import {
  savePhoneNumber,
  getPhoneNumber,
  isInputValid,
  showErrorToast,
} from '@utils';
import { setPhoneNumber } from '@slices';
import { useAppDispatch } from '@hooks';
import { styles } from './styles';
import { validationSchema } from './validationSchema';
import { signUpAPI } from './service';

export const SignUp: FC<PublicNavigatorScreenProps> = ({
  navigation: { navigate },
}) => {
  const [formData, setFormData] = useState(validationSchema);
  const dispatch = useAppDispatch();

  const dispatchSignUp = () => {
    savePhoneNumber(formData.phone.value);
    dispatch(setPhoneNumber({ phoneNumber: formData.phone.value }));
    navigate('SuccessSignUp');
  };

  const signUpHandler = () => {
    if (
      isInputValid({
        value: formData.phone.value,
        exactLength: formData.phone.exactLength,
        regexp: formData.phone.regexp,
      }) &&
      isInputValid({
        value: formData.password.value,
        maxLength: formData.password.maxLength,
        minLength: formData.password.minLength,
      })
    ) {
      setFormData({
        ...formData,
        password: {
          ...formData.password,
          isActive: false,
          isTouched: true,
        },
        phone: {
          ...formData.phone,
          isActive: false,
          isTouched: true,
        },
      });

      signUpAPI({
        dispatchSignUp: dispatchSignUp,
        showErrorToast: showErrorToast,
        phoneNumber: formData.phone.value,
        password: formData.password.value,
      });
    } else {
      setFormData({
        ...formData,
        password: {
          ...formData.password,
          isValid: false,
          isActive: false,
          isTouched: true,
        },
        phone: {
          ...formData.phone,
          isValid: false,
          isActive: false,
          isTouched: true,
        },
      });
      showErrorToast('Данные не верные');
    }
  };

  useEffect(() => {
    (async () => {
      const phoneNumber = await getPhoneNumber();
      dispatch(setPhoneNumber({ phoneNumber: phoneNumber }));

      if (phoneNumber) {
        navigate('SignIn');
      }
    })();
  }, []);

  return (
    <AuthLayout>
      <View style={styles.inputContainer}>
        <Input
          formData={formData}
          setFormData={setFormData}
          inputKey="phone"
          keyboardType="numeric"
          label="Номер телефона"
          placeholderTextColor={colors.black[90]}
          cursorColor={colors.black[100]}
          textContentType="telephoneNumber"
          placeholder="900 000 000"
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          formData={formData}
          setFormData={setFormData}
          inputKey="password"
          label="Пароль"
          placeholder="****"
          keyboardType="default"
          textContentType="password"
          placeholderTextColor={colors.black[90]}
          cursorColor={colors.black[100]}
          secureTextEntry
        />
      </View>
      <Button
        label="Зарегистрироваться"
        onPress={() => {
          signUpHandler();
        }}
      />
    </AuthLayout>
  );
};
