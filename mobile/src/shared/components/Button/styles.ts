import { colors, fontSizes } from '@styles';
import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primaryBlue,
    borderRadius: 4,
    alignItems: 'center',
  },
  label: {
    color: colors.white,
    fontSize: fontSizes[2][0],
    lineHeight: fontSizes[2][1],
    fontWeight: '500',
  },
  pressed: {
    backgroundColor: colors.blue[100],
  },
});
