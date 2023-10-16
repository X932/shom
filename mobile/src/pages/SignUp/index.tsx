import { FC, useEffect } from 'react';
import { View } from 'react-native';
import { AuthLayout } from '@ui-layouts';
import { Button, Divider, Input } from '@components';
import { colors } from '@styles';
import { PublicNavigatorScreenProps } from '@interfaces';
import { savePhoneNumber, getPhoneNumber, showErrorToast } from '@utils';
import { setPhoneNumber } from '@slices';
import { useAppDispatch } from '@hooks';
import { Controller, useForm } from 'react-hook-form';
import { styles } from './styles';
import { signUpAPI } from './service';
import { ISignUpForm } from './interface';

export const SignUp: FC<PublicNavigatorScreenProps> = ({
  navigation: { navigate },
}) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>({
    mode: 'onBlur',
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const dispatch = useAppDispatch();

  const dispatchSignUp = (phone: string) => {
    savePhoneNumber(phone);
    dispatch(setPhoneNumber({ phoneNumber: phone }));
    reset();
    navigate('SuccessSignUp');
  };

  const signUpHandler = (credentials: ISignUpForm) => {
    signUpAPI({
      dispatchSignUp: dispatchSignUp,
      showErrorToast: showErrorToast,
      credentials: credentials,
    });
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
              keyboardType="numeric"
              placeholderTextColor={colors.black[90]}
              cursorColor={colors.black[100]}
              textContentType="telephoneNumber"
              placeholder="900 000 000"
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
              placeholder="****"
              keyboardType="default"
              textContentType="password"
              placeholderTextColor={colors.black[90]}
              cursorColor={colors.black[100]}
              errorMessage={errors.password?.message}
              secureTextEntry
            />
          )}
        />
      </View>
      <Button
        label="Зарегистрироваться"
        onPress={handleSubmit(signUpHandler)}
      />
      <Divider />
      <Button
        label="Войти"
        onPress={() => {
          reset();
          navigate('SignIn');
        }}
      />
    </AuthLayout>
  );
};
