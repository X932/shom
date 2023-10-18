import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
    gap: 8,
  },
  productTypesContainer: {
    gap: 8,
  },
  productType: {
    gap: 8,
    marginTop: 12,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 1,
  },
});
