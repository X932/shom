import { colors, fontSizes } from '@styles';
import { StyleSheet } from 'react-native';

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
  pressed: {
    backgroundColor: colors.blue['100'],
  },
  disabled: {
    backgroundColor: colors.grey,
  },
});
