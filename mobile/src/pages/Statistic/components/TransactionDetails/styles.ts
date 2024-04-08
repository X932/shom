import { StyleSheet } from 'react-native';
import { colors, fontSizes } from '@styles';

export const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    gap: 8,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: '700',
    fontSize: fontSizes['4']['0'],
    lineHeight: fontSizes['4']['1'],
    marginBottom: 12,
  },
  text: {
    color: colors.black['100'],
    fontSize: fontSizes['3']['0'],
    lineHeight: fontSizes['3']['1'],
  },
});
