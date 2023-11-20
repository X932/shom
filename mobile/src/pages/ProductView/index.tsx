import { Button, Card } from '@components';
import { MEDIA_BASE_URL } from '@env';
import { PrivateNavigatorScreenProps } from '@interfaces';
import { MainLayout } from '@ui-layouts';
import { FC, useState } from 'react';
import { Image, Modal, ScrollView, Text, View } from 'react-native';
import { IProduct } from '../ProductsList/interface';
import { deleteProductAPI } from './service';
import { styles } from './styles';

export const ProductView: FC<PrivateNavigatorScreenProps> = ({
  route,
  navigation,
}) => {
  const product = route.params as IProduct;
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
      id: product.id,
      setIsLoading: setIsLoading,
      successResponseHandler: successResponseHandler,
      errorResponseHandler: errorResponseHandler,
    });
  };

  return (
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
                Уверены, что хотите удалить {product.title.toLowerCase()}?
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
              label="Удалить"
              variant="danger"
              onPress={() => setIsModalOpen(true)}
            />
          </View>
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
        <View style={styles.buttonUpdate}>
          <Button
            label="Изменить"
            variant="outline"
            onPress={() => navigation.navigate('ProductUpdate', { ...product })}
          />
        </View>
      </MainLayout>
    </ScrollView>
  );
};
