import { FC } from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Card, Divider } from '@components';
import { MEDIA_BASE_URL } from '@env';
import { ISelectedProduct } from '../SelectedProductCard/interface';
import { IProductCardProps } from './interface';
import { styles } from './styles';

export const ProductCard: FC<IProductCardProps> = ({
  product,
  setSelectedProducts,
}) => {
  const handleSelectProduct = (newOrder: ISelectedProduct) => {
    setSelectedProducts(previosOrders => {
      let isOrderExist = false;
      const orders = previosOrders.map(order => {
        if (order.productDetailsId === newOrder.productDetailsId) {
          isOrderExist = true;
          return { ...order, quantity: order.quantity + 1 };
        }
        return order;
      });

      if (isOrderExist) {
        return orders;
      }

      orders.push(newOrder);
      return orders;
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
            <Text style={[styles.textStyle, styles.textBlack]}>
              {product.title}
            </Text>
            {product.details.map((details, index) => {
              const isExist = details.inventory.quantity > 0;

              return (
                <View key={details.id}>
                  <View style={styles.details}>
                    <View>
                      <Text style={[styles.textStyle, styles.textBlack]}>
                        {details.size} г. - {details.price.amount} сом
                      </Text>
                      <Text
                        style={
                          isExist
                            ? [styles.textStyle, styles.textBlack]
                            : [styles.textDanger, styles.textStyle]
                        }>
                        {isExist
                          ? `${details.inventory.quantity} шт`
                          : 'Нет в наличии'}{' '}
                        - {details.inventory.branch.title}
                      </Text>
                    </View>

                    {isExist && (
                      <View>
                        <Button
                          label="+"
                          onPress={() =>
                            handleSelectProduct({
                              imgPath: product.imgPath,
                              priceAmount: details.price.amount,
                              productDetailsId: details.id,
                              productId: product.id,
                              quantity: 1,
                              size: details.size,
                              branchTitle: details.inventory.branch.title,
                              productTitle: product.title,
                            })
                          }
                          variant="outline"
                        />
                      </View>
                    )}
                  </View>
                  {index + 1 !== product.details.length && <Divider />}
                </View>
              );
            })}
          </View>
        </View>
      </Card>
    </View>
  );
};
