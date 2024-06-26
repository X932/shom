import { StyleSheet } from 'react-native';
import { colors } from '@styles';

export const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flex: 1,
    gap: 12,
  },
  chartContainer: {
    paddingLeft: 12,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: '#232B5D',
    width: '100%',
  },
  tooltipContainer: {
    marginBottom: 8,
    backgroundColor: colors.white,
    padding: 6,
    borderRadius: 4,
  },
});
