import { FC } from 'react';
import { Text, View } from 'react-native';
import { IProduct } from '../../interface';
import { styles } from './styles';

export const Card: FC<IProduct> = ({ title, description, details }) => {
  return (
    // navigate onPress to page for delete | update
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{description}</Text>
      {details.map(item => (
        <View key={item.id} style={styles.detailsContainer}>
          <Text>Размер: {item.size}</Text>
          <Text>{item.price.amount} с.</Text>
        </View>
      ))}
    </View>
  );
};
