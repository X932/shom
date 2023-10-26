import { Button, Card } from '@components';
import { MEDIA_BASE_URL } from '@env';
import { PrivateNavigatorScreenProps } from '@interfaces';
import { MainLayout } from '@ui-layouts';
import { FC } from 'react';
import { Image, Text, View } from 'react-native';
import { IProduct } from '../ProductsList/interface';
import { styles } from './styles';

export const ProductView: FC<PrivateNavigatorScreenProps> = ({
  route,
  navigation,
}) => {
  const product = route.params as IProduct;

  return (
    <MainLayout>
      <View style={styles.buttonContainer}>
        <Button
          label="Назад"
          variant="outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.textColor, styles.title]}>{product.title}</Text>
        <Text style={[styles.textColor, styles.description]}>
          {product.description}
        </Text>
        <Card>
          <View style={styles.detailsContainer}>
            {product.details.map(({ id, price, size }, index) => (
              <View
                style={[
                  styles.detailContainer,
                  index > 0 && { borderTopWidth: 1 },
                ]}
                key={id}>
                <Text style={[styles.textColor, styles.detailText]}>
                  {price.amount} сом
                </Text>
                <Text style={[styles.textColor, styles.detailText]}>
                  Возраст: {size}
                </Text>
              </View>
            ))}
          </View>
        </Card>
        <Image
          source={{
            uri: MEDIA_BASE_URL + product.imgPath,
            method: 'GET',
          }}
          style={styles.image}
        />
      </View>
    </MainLayout>
  );
};
