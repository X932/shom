import { FC } from 'react';
import { View } from 'react-native';
import { AuthLayout } from '@ui-layouts';
import { Button, Divider, Input } from '@components';
import { colors } from '@styles';
import { PublicNavigatorScreenProps } from '@interfaces';
import { useAppDispatch, useAppSelector } from '@hooks';
import { authentication, setPhoneNumber } from '@slices';
import { Controller, useForm } from 'react-hook-form';
import { savePhoneNumber } from '@utils';
import { styles } from './styles';
import { signInAPI } from './service';
import { ISignInForm } from './interface';

export const SignIn: FC<PublicNavigatorScreenProps> = ({
  navigation: { navigate },
}) => {
  const { phoneNumber } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>({
    mode: 'onBlur',
    defaultValues: {
      phone: phoneNumber || '',
      password: '',
    },
  });

  const dispatchSignIn = (phoneNumber: string) => {
    dispatch(authentication({ isLoggedIn: true }));
    dispatch(setPhoneNumber({ phoneNumber: phoneNumber }));
    savePhoneNumber(phoneNumber);
    reset();
  };
  const signIn = (values: ISignInForm) => {
    signInAPI({
      signInCredentials: values,
      dispatchSignIn: dispatchSignIn,
    });
  };

  return (
    <AuthLayout>
      <View style={styles.inputContainer}>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: { value: true, message: 'Это обязательное поле' },
            minLength: { value: 9, message: 'Минимум 9 цифр' },
          }}
          render={({ field }) => (
            <Input
              {...field}
              onChangeText={value => field.onChange(value)}
              placeholder="900 000 000"
              keyboardType="numeric"
              placeholderTextColor={colors.black[90]}
              cursorColor={colors.black['100']}
              textContentType="telephoneNumber"
              errorMessage={errors.phone?.message}
            />
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'Это обязательное поле' },
            minLength: { value: 4, message: 'Минимум 4 символов' },
          }}
          render={({ field }) => (
            <Input
              {...field}
              onChangeText={value => field.onChange(value)}
              placeholder="Пароль"
              keyboardType="default"
              textContentType="password"
              placeholderTextColor={colors.black[90]}
              cursorColor={colors.black['100']}
              errorMessage={errors.password?.message}
              secureTextEntry
            />
          )}
        />
      </View>
      <Button label="Войти" onPress={handleSubmit(signIn)} />
      {!phoneNumber && (
        <>
          <Divider />
          <Button
            label="Зарегистрироваться"
            onPress={() => {
              reset();
              navigate('SignUp');
            }}
          />
        </>
      )}
    </AuthLayout>
  );
};
