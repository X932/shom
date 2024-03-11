import { MEDIA_BASE_URL } from '@env';
import { useFocusEffect } from '@react-navigation/native';
import { FC, useCallback, useState } from 'react';
import { Image, Modal, ScrollView, Text, View } from 'react-native';
import { GuardLayout, MainLayout } from '@ui-layouts';
import { PrivateNavigatorScreenProps, IProduct } from '@interfaces';
import { Button, Card } from '@components';
import { deleteProductAPI, getProductAPI } from './service';
import { styles } from './styles';

export const ProductView: FC<PrivateNavigatorScreenProps> = ({
  route,
  navigation,
}) => {
  const { id: productID } = route.params as Pick<IProduct, 'id'>;
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const successResponseHandler = () => {
    navigation.goBack();
    setIsModalOpen(false);
  };

  const errorResponseHandler = () => {
    setIsModalOpen(false);
  };

  const deleteHandler = () => {
    setIsLoading(true);
    deleteProductAPI({
      id: productID,
      setIsLoading: setIsLoading,
      successResponseHandler: successResponseHandler,
      errorResponseHandler: errorResponseHandler,
    });
  };

  useFocusEffect(
    useCallback(() => {
      getProductAPI({
        id: productID,
        setIsLoading: setIsLoading,
        successResponseHandler: product => {
          setProduct(product);
        },
      });
    }, [productID]),
  );

  return (
    <GuardLayout>
      <ScrollView>
        <MainLayout>
          <Modal
            animationType="fade"
            transparent={false}
            visible={isModalOpen}
            onRequestClose={() => {
              setIsModalOpen(false);
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>
                  Уверены, что хотите удалить {product?.title.toLowerCase()}?
                </Text>
                <View style={styles.buttonsContainer}>
                  <Button
                    style={styles.buttonContainer}
                    label="Нет"
                    onPress={() => {
                      setIsModalOpen(false);
                    }}
                  />
                  <Button
                    style={styles.buttonContainer}
                    label="Да"
                    disabled={isLoading}
                    variant="outline"
                    onPress={() => deleteHandler()}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <Button
                label="Назад"
                variant="outline"
                onPress={() => navigation.navigate('ProductsList')}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                label="Изменить"
                variant="outline"
                onPress={() =>
                  navigation.navigate('ProductUpdate', { id: product?.id })
                }
              />
            </View>
          </View>

          <View style={styles.content}>
            <Text style={[styles.textColor, styles.title]}>
              {product?.title}
            </Text>
            <Text style={[styles.textColor, styles.description]}>
              {product?.description}
            </Text>
            <Card>
              <View style={styles.detailsContainer}>
                {product?.details.map(
                  ({ id, price, size, inventory }, index) => (
                    <View
                      style={[
                        styles.detailContainer,
                        index > 0 && { borderTopWidth: 1 },
                      ]}
                      key={id}>
                      <Text style={[styles.textColor, styles.detailText]}>
                        Возраст: {size}
                      </Text>
                      <Text style={[styles.textColor, styles.detailText]}>
                        {price.amount} сом
                      </Text>
                      {inventory.quantity > 0 ? (
                        <Text style={[styles.textColor, styles.detailText]}>
                          {inventory.quantity} шт
                        </Text>
                      ) : (
                        <Text style={[styles.textDanger, styles.detailText]}>
                          Нет в наличии
                        </Text>
                      )}
                      <Text style={[styles.textColor, styles.detailText]}>
                        {inventory.branch.title}
                      </Text>
                    </View>
                  ),
                )}
              </View>
            </Card>
            <Image
              source={{
                uri: MEDIA_BASE_URL + product?.imgPath,
                method: 'GET',
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.buttonDelete}>
            <Button
              label="Удалить"
              variant="danger"
              onPress={() => setIsModalOpen(true)}
            />
          </View>
        </MainLayout>
      </ScrollView>
    </GuardLayout>
  );
};
