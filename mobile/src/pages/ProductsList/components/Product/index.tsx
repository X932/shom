import { Card } from '@components';
import { MEDIA_BASE_URL } from '@env';
import { PrivateScreenList } from '@interfaces';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IProduct } from '../../interface';
import { styles } from './styles';

export const Product: FC<IProduct> = ({
  title,
  description,
  imgPath,
  details,
}) => {
  const navigation = useNavigation<DrawerNavigationProp<PrivateScreenList>>();

  return (
    // navigate onPress to page for delete | update
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductCreate')}
      activeOpacity={1}
      style={styles.container}>
      <Card>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Image
            source={{
              uri: MEDIA_BASE_URL + imgPath,
              method: 'GET',
            }}
            style={{ width: 400, height: 400 }}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};
