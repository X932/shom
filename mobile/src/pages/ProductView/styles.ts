import { StyleSheet } from 'react-native';
import { colors, fontSizes } from '@styles';

export const styles = StyleSheet.create({
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalHeader: {
    marginBottom: 8,
    fontSize: fontSizes[3][0],
    lineHeight: fontSizes[3][1],
    color: colors.black['100'],
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
  textDanger: {
    color: colors.red,
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
  buttonDelete: {
    marginBottom: 16,
  },
});
