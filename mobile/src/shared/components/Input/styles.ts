import { StyleSheet } from 'react-native';
import { colors } from '@styles';

export const inputStyles = StyleSheet.create({
  structure: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.grey,
    backgroundColor: colors.white,
  },
  inputHeight: {
    height: 40,
  },
  default: {
    color: colors.black[90],
  },
  error: {
    borderColor: colors.red,
    color: colors.red,
  },
});
