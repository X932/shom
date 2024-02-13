import { useFocusEffect } from '@react-navigation/native';
import { MainLayout } from '@ui-layouts';
import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { Product } from './components/Product';
import { IProduct } from './interface';
import { getProductsAPI } from './service';
import { styles } from './styles';

export const ProductsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  let isActive = true;

  const successResponseHandler = (data: IProduct[]) => {
    if (isActive) {
      setProducts(data);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      isActive = true;
      getProductsAPI({
        successResponseHandler: successResponseHandler,
        setIsLoading: setIsLoading,
      });
      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <MainLayout>
      <SafeAreaView style={styles.container}>
        {isLoading && <Text>Loading . . .</Text>}
        {products.length > 0 ? (
          <FlatList
            // TODO create fetch more logic
            data={products}
            renderItem={({ item }) => <Product {...item} />}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={0.7}
            onEndReached={() => console.log('end of list')}
          />
        ) : (
          <Text>Пусто</Text>
        )}
      </SafeAreaView>
    </MainLayout>
  );
};
