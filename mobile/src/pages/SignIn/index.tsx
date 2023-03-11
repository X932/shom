import { FC, useState } from 'react';
import { View } from 'react-native';
import { AuthLayout } from '@ui-layouts';
import { Button, Input } from '@components';
import { colors } from '@styles';
import { PublicNavigatorScreenProps } from '@interfaces';
import { authentication } from '@slices';
import { useAppDispatch } from '@hooks';
import { styles } from './styles';
import { validationSchema } from './validationSchema';

export const SignIn: FC<PublicNavigatorScreenProps> = () => {
  const [formData, setFormData] = useState(validationSchema);
  const dispatch = useAppDispatch();

  return (
    <AuthLayout>
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
        label="Войти"
        onPress={async () => {
          dispatch(authentication({ isLoggedIn: true }));
        }}
      />
    </AuthLayout>
  );
};
