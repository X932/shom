import { StyleSheet } from 'react-native';
import { colors, fontSizes } from '@styles';

export const styles = StyleSheet.create({
  cardsContainer: {
    marginBottom: 12,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  textDanger: {
    color: colors.red,
  },
  textBlack: {
    color: colors.black['100'],
  },
  textStyle: {
    fontSize: fontSizes['4']['0'],
    lineHeight: fontSizes['4']['1'],
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
});
