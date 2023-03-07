import { FC, useState } from 'react';
import { View } from 'react-native';
import { AuthLayout } from '@ui-layouts';
import { Button, Input } from '@components';
import { colors } from '@styles';
import { PublicNavigatorScreenProps } from '@interfaces';
import { savePhoneNumber } from '@utils';
import { styles } from './styles';
import { validationSchema } from './validationSchema';

export const SignUp: FC<PublicNavigatorScreenProps> = ({
  navigation: { navigate },
}) => {
  const [formData, setFormData] = useState(validationSchema);

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
          navigate('SuccessSignUp');
        }}
      />
    </AuthLayout>
  );
};
