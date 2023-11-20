import { colors } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  activeDrawerItemLabel: {
    color: colors.blue['90'],
  },
  defaultDrawerItemLabel: {
    color: colors.black['90'],
  },
  activeDrawerItemBg: {
    backgroundColor: colors.blue['80'],
  },
  defaultDrawerItemBg: {
    backgroundColor: colors.white,
  },
});
