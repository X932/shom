import { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { colors } from '@styles';
import { isInputValid } from '@utils';
import { styles } from './styles';
import { ISignUpForm } from './interface';
import { validationSchema } from './validationSchema';

export const SignUp = () => {
  const [formData, setFormData] = useState(validationSchema);

  const onChangeHandler = (key: keyof ISignUpForm, value: string): void => {
    if (isInputValid({ ...validationSchema[key], value })) {
      setFormData({
        ...formData,
        [key]: {
          ...formData[key],
          value: value,
          isTouched: true,
          isValid: true,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../shared/images/logo.jpeg')}
        style={styles.logo}
      />
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Номер телефона</Text>
          <TextInput
            onChangeText={text => onChangeHandler('phone', text)}
            value={formData.phone.value}
            placeholder="900 000 000"
            keyboardType="numeric"
            textContentType="telephoneNumber"
            maxLength={9}
            placeholderTextColor={colors.black}
            cursorColor={colors.black}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Пароль</Text>
          <TextInput
            onChangeText={text => onChangeHandler('password', text)}
            value={formData.password.value}
            placeholder="****"
            keyboardType="default"
            textContentType="password"
            maxLength={20}
            placeholderTextColor={colors.black}
            cursorColor={colors.black}
            style={styles.input}
            secureTextEntry
          />
        </View>
      </View>
    </View>
  );
};
