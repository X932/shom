import { StyleSheet } from 'react-native';
import { colors } from '@styles';

export const styles = StyleSheet.create({
  layoutContainer: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 40,
    padding: 20,
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 99,
  },
  contentContainer: {
    width: '100%',
    gap: 20,
  },
});
