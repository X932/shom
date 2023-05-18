import { FC, useState } from 'react';
import { View } from 'react-native';
import { AuthLayout } from '@ui-layouts';
import { Button, Input } from '@components';
import { colors } from '@styles';
import { PublicNavigatorScreenProps } from '@interfaces';
import { useAppDispatch, useAppSelector } from '@hooks';
import { authentication } from '@slices';
import { isInputValid, showErrorToast } from '@utils';
import { styles } from './styles';
import { validationSchema } from './validationSchema';
import { signInAPI } from './service';

export const SignIn: FC<PublicNavigatorScreenProps> = () => {
  const [formData, setFormData] = useState(validationSchema);
  const { phoneNumber } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const dispatchSignIn = () => {
    dispatch(authentication({ isLoggedIn: true }));
  };

  const submitHandler = () => {
    if (
      phoneNumber &&
      isInputValid({
        value: formData.password.value,
        exactLength: validationSchema.password.exactLength,
        maxLength: validationSchema.password.maxLength,
        minLength: validationSchema.password.minLength,
        regexp: validationSchema.password.regexp,
      })
    ) {
      signInAPI({
        phoneNumber: phoneNumber,
        password: formData.password.value,
        dispatchSignIn: dispatchSignIn,
      });
    } else {
      showErrorToast('Данные не верные');
    }
  };

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
          submitHandler();
        }}
      />
    </AuthLayout>
  );
};
