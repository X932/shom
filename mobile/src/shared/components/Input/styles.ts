import { StyleSheet } from 'react-native';
import { colors } from '@styles';

export const inputStyles = StyleSheet.create({
  structure: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
  },
  label: {
    color: colors.black[90],
    fontSize: 16,
  },
  default: {
    borderColor: colors.black[90],
    color: colors.black[90],
  },
  active: {
    borderColor: colors.black[100],
    color: colors.black[100],
  },
  success: {
    borderColor: colors.green[100],
    color: colors.green[100],
  },
  error: {
    borderColor: colors.red,
    color: colors.red,
  },
});
