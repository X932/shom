import { MainLayout } from '@ui-layouts';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { Card } from './components/Card';
import { IProduct } from './interface';
import { getProductsAPI } from './service';

export const ProductsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  const successResponseHandler = (data: IProduct[]) => {
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductsAPI({
      successResponseHandler: successResponseHandler,
      setIsLoading: setIsLoading,
    });
  }, []);

  return (
    <MainLayout>
      <SafeAreaView>
        {isLoading && <Text>Loading . . .</Text>}
        <FlatList
          data={products}
          renderItem={({ item }) => <Card {...item} />}
          keyExtractor={item => String(item.id)}
        />
      </SafeAreaView>
    </MainLayout>
  );
};
