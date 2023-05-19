import { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};
