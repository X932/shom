import { StyleSheet } from 'react-native';
import { colors, fontSizes } from '@styles';

export const styles = StyleSheet.create({
  modalContent: {
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
    marginBottom: 12,
  },
  headerText: {
    fontSize: fontSizes['5']['0'],
    lineHeight: fontSizes['5']['1'],
  },
  accountContainer: {
    flexDirection: 'row',
    gap: 20,
    borderBottomColor: colors.grey,
  },
  text: {
    color: colors.black['100'],
    fontSize: fontSizes['4']['0'],
    lineHeight: fontSizes['4']['1'],
  },
});
