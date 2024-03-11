import { StyleSheet } from 'react-native';
import { colors, fontSizes } from '@styles';

export const buttonStyles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  label: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    fontSize: fontSizes[2][0],
    lineHeight: fontSizes[2][1],
    fontWeight: '500',
  },
  primary: {
    backgroundColor: colors.primaryBlue,
    color: colors.white,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    color: colors.black['100'],
  },
  danger: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.red,
    color: colors.red,
  },
  pressed: {
    backgroundColor: colors.blue['100'],
  },
  disabled: {
    backgroundColor: colors.grey,
  },
});
