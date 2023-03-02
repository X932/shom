import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors } from '@styles';
import { styles } from './styles';

export const SignUp = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          onChangeText={setText}
          value={text}
          placeholder="900 000 000"
          keyboardType="numeric"
          textContentType="telephoneNumber"
          placeholderTextColor={colors.black}
          cursorColor={colors.black}
          style={styles.input}
        />
      </View>
    </View>
  );
};
