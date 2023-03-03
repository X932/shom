import { StyleSheet } from 'react-native';
import { colors } from '@styles';

export const styles = StyleSheet.create({
  container: {
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
  inputsContainer: {
    width: '100%',
    gap: 20,
  },
  inputContainer: {
    width: '100%',
    gap: 4,
  },
  label: {
    color: colors.black,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
    color: colors.black,
  },
});
