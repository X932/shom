import { StyleSheet } from 'react-native';
import { colors, fontSizes } from '@styles';

export const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainCardText: {
    color: colors.black['100'],
    fontSize: fontSizes['3']['0'],
    lineHeight: fontSizes['3']['1'],
  },
});
