import { StyleSheet } from 'react-native';
import { colors, fontSizes } from '@styles';

export const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    gap: 12,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: '700',
    fontSize: fontSizes['5']['0'],
    lineHeight: fontSizes['5']['1'],
    marginBottom: 12,
    color: colors.grey,
  },
  text: {
    color: colors.black['100'],
    fontSize: fontSizes['4']['0'],
    lineHeight: fontSizes['4']['1'],
  },
});
