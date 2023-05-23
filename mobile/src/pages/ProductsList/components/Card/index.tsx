import { PrivateScreenList } from '@interfaces';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IProduct } from '../../interface';
import { styles } from './styles';

export const Card: FC<IProduct> = ({ title, description, details }) => {
  const navigation = useNavigation<DrawerNavigationProp<PrivateScreenList>>();

  return (
    // navigate onPress to page for delete | update
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductCreate')}
      activeOpacity={1}
      style={styles.container}>
      <Text>{title}</Text>
      <Text>{description}</Text>
      {details.map(item => (
        <View key={item.id} style={styles.detailsContainer}>
          <Text>Размер: {item.size}</Text>
          <Text>{item.price.amount} с.</Text>
        </View>
      ))}
    </TouchableOpacity>
  );
};
