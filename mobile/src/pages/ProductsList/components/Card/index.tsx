import { FC } from 'react';
import { Text, View } from 'react-native';
import { IProduct } from '../../interface';
import { styles } from './styles';

export const Card: FC<IProduct> = ({ title, details }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      {details.map(item => (
        <View key={item.id} style={styles.detailsContainer}>
          <Text>Описание: {item.description}</Text>
          <Text>Размер: {item.size}</Text>
          <Text>{item.price.amount} с.</Text>
        </View>
      ))}
    </View>
  );
};
