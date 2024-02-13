import { Button } from '@components';
import { useFocusEffect } from '@react-navigation/native';
import { MainLayout } from '@ui-layouts';
import { useCallback, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { IProduct } from '../ProductsList/interface';
import { getProductsAPI } from '../ProductsList/service';
import { styles } from './styles';
import { ProductsList } from './components/ProductsList';
import { ISelectedProduct } from './components/SelectedProductCard/interface';

export const Sales = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProduct[]>(
    [],
  );
  const [showProductsList, setShowProductsList] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  const successResponseHandler = (data: IProduct[]) => {
    setProducts(data);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getProductsAPI({
        successResponseHandler: successResponseHandler,
        setIsLoading: setIsLoading,
      });
    }, []),
  );

  return (
    <MainLayout>
      <SafeAreaView style={styles.viewContainer}>
        {showProductsList && !isLoading ? (
          <>
            <Button
              label="Готово"
              onPress={() => setShowProductsList(false)}
              variant="outline"
            />
            <ProductsList
              products={products}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </>
        ) : (
          <View>
            <Button
              label="Выбрать продукты"
              disabled={false}
              onPress={() => setShowProductsList(true)}
              variant="outline"
            />
          </View>
        )}
      </SafeAreaView>
    </MainLayout>
  );
};
