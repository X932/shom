import { StyleSheet } from 'react-native';
import { colors } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    marginBottom: 16,
  },
  tabTitle: {
    color: colors.black['90'],
  },
  tabIndicator: {
    backgroundColor: colors.black['90'],
  },
  listContainer: {
    marginTop: 12,
  },
});
