import { MainLayout } from '@ui-layouts';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { Card } from './components/Card';
import { IProduct } from './interface';
import { getProductsAPI } from './service';

export const ProductsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[] | undefined>();

  const responseHandler = (data?: IProduct[]) => {
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductsAPI({ responseHandler: responseHandler });
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
