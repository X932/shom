import { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};
