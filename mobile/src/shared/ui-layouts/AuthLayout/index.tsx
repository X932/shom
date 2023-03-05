import { FC, PropsWithChildren } from 'react';
import { Image, View } from 'react-native';
import { styles } from './styles';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.layoutContainer}>
      <Image source={require('../../images/logo.jpeg')} style={styles.logo} />
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};
