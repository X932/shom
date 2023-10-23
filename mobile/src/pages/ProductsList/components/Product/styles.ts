import { colors, fontSizes } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    color: colors.black['100'],
    fontSize: fontSizes['4']['0'],
    lineHeight: fontSizes['4']['1'],
    fontWeight: 'bold',
  },
  description: {
    fontSize: fontSizes['3']['0'],
    lineHeight: fontSizes['3']['1'],
  },
});
