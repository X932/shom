import { FC, useState } from 'react';
import { View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { AuthLayout } from '@ui-layouts';
import { Button, Input } from '@components';
import { colors } from '@styles';
import { RootDrawerParamList } from '@interfaces';
import { styles } from './styles';
import { validationSchema } from './validationSchema';

export const SignUp: FC<
  DrawerScreenProps<RootDrawerParamList, keyof RootDrawerParamList>
> = ({ navigation: { navigate } }) => {
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
        onPress={() => navigate('SuccessSignUp')}
      />
    </AuthLayout>
  );
};
