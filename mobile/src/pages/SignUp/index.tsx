import { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { colors } from '@styles';
import { styles } from './styles';

export const SignUp = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

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
            onChangeText={setPhone}
            value={phone}
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
            onChangeText={setPassword}
            value={password}
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
