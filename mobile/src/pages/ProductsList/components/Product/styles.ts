import { StyleSheet } from 'react-native';
import { colors, fontSizes } from '@styles';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  contentContainer: {
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
    marginVertical: 8,
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 380,
    borderRadius: 8,
  },
});
