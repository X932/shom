import { colors, fontSizes } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    display: 'flex',
    alignItems: 'center',
  },
  modalHeader: {
    marginBottom: 8,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 16,
  },
  buttonContainer: {
    width: 140,
    marginVertical: 12,
  },
  content: {
    display: 'flex',
    gap: 12,
    marginBottom: 20,
  },
  textColor: {
    color: colors.black['100'],
  },
  detailText: {
    fontSize: fontSizes['3']['0'],
    lineHeight: fontSizes['3']['1'],
  },
  detailsContainer: {
    display: 'flex',
    gap: 12,
  },
  detailContainer: {
    borderStyle: 'dashed',
  },
  title: {
    fontSize: fontSizes['5']['0'],
    lineHeight: fontSizes['5']['1'],
    fontWeight: 'bold',
  },
  description: {
    fontSize: fontSizes['3']['0'],
    lineHeight: fontSizes['3']['1'],
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 380,
    borderRadius: 8,
  },
  buttonUpdate: {
    marginBottom: 16,
  },
});
