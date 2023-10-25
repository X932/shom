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
  ...restProps
}) => {
  const navigation = useNavigation<DrawerNavigationProp<PrivateScreenList>>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductView', {
          title: title,
          description: description,
          imgPath: imgPath,
          ...restProps,
        })
      }
      activeOpacity={1}
      style={styles.container}>
      <Card>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Image
            source={{
              uri: MEDIA_BASE_URL + imgPath,
              method: 'GET',
            }}
            style={styles.image}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};
