import { colors, fontSizes } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 8,
    flex: 1,
  },
  saleFormContainer: {
    flex: 1,
    gap: 16,
  },
  textBlack: {
    color: colors.black['100'],
  },
  textStyle: {
    fontSize: fontSizes['4']['0'],
    lineHeight: fontSizes['4']['1'],
  },
});
