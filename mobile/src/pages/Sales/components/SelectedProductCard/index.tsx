import { FC } from 'react';
import { Image, Text, View } from 'react-native';
import { MEDIA_BASE_URL } from '@env';
import { Button, Card } from '@components';
import { ISelectedProduct, ISelectedProductCardProps } from './interface';
import { styles } from './styles';

export const SelectedProductCard: FC<ISelectedProductCardProps> = ({
  product,
  setSelectedProducts,
}) => {
  const handleUnselectProduct = () => {
    setSelectedProducts(previosOrders => {
      return previosOrders.reduce<ISelectedProduct[]>(
        (previosNewOrders, currentOrder) => {
          if (currentOrder.productDetailsId === product.productDetailsId) {
            const currentQuantity = currentOrder.quantity - 1;

            if (currentQuantity > 0) {
              return [
                ...previosNewOrders,
                {
                  ...currentOrder,
                  quantity: currentQuantity,
                },
              ];
            }
            return previosNewOrders;
          }
          return [...previosNewOrders, currentOrder];
        },
        [],
      );
    });
  };

  return (
    <View style={styles.cardsContainer}>
      <Card>
        <View style={styles.cardContent}>
          <Image
            source={{
              uri: MEDIA_BASE_URL + product.imgPath,
              method: 'GET',
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.text}>{product.productTitle}</Text>
            <View style={styles.details}>
              <View>
                <Text style={styles.text}>
                  {product.size} г. - {product.priceAmount} сом
                </Text>
                <Text style={styles.text}>
                  {product.quantity}шт - {product.branchTitle}
                </Text>
              </View>

              <View>
                <Button
                  label="-"
                  onPress={handleUnselectProduct}
                  variant="danger"
                />
              </View>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};
