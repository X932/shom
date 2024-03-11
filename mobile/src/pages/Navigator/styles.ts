import { StyleSheet } from 'react-native';
import { colors } from '@styles';

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
