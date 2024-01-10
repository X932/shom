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
    display: 'flex',
    alignItems: 'center',
  },
  actionTypeButton: {
    width: 48,
  },
  productType: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    gap: 8,
    marginTop: 20,
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
  dropdownContainer: {
    width: '100%',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  listContainer: {
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  inputSearch: {
    height: 40,
    borderRadius: 8,
  },
});
