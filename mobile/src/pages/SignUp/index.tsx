import { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { AuthLayout } from '@ui-layouts';
import { Button, Input } from '@components';
import { colors } from '@styles';
import { PublicNavigatorScreenProps } from '@interfaces';
import { savePhoneNumber, getPhoneNumber } from '@utils';
import { setPhoneNumber } from '@slices';
import { useAppDispatch } from '@hooks';
import { styles } from './styles';
import { validationSchema } from './validationSchema';

export const SignUp: FC<PublicNavigatorScreenProps> = ({
  navigation: { navigate },
}) => {
  const [formData, setFormData] = useState(validationSchema);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const phoneNumber = await getPhoneNumber();
      dispatch(setPhoneNumber({ phoneNumber }));

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
          // save after validation before sending request
          savePhoneNumber(formData.phone.value);
          dispatch(setPhoneNumber({ phoneNumber: formData.phone.value }));
          navigate('SuccessSignUp');
        }}
      />
    </AuthLayout>
  );
};
