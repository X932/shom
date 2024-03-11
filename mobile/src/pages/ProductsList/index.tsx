import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { GuardLayout, MainLayout } from '@ui-layouts';
import { getProductsAPI } from '@services';
import {
  IDataList,
  IProduct,
  IResponseWrapper,
  TProductParams,
} from '@interfaces';
import { Input } from '@components';
import { colors } from '@styles';
import { useDebounce } from '@hooks';
import { httpExceptionHandler } from '@utils';
import { Product } from './components/Product';
import { styles } from './styles';

const INITIAL_PARAMS: TProductParams = {
  title: '',
  rowsLimit: 2,
  rowsOffset: 0,
};

export const ProductsList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [params, setParams] = useState<TProductParams>(INITIAL_PARAMS);
  const [searchText, setSearchText] = useState('');

  const debouncedSearchText = useDebounce(searchText);

  const { data: productsResponse, isLoading } = useQuery({
    queryKey: ['products', params],
    queryFn: () => getProductsAPI(params),
    onSuccess: (response: IDataList<IProduct>) => {
      successResponseHandler(response);
    },
    onError: (error: AxiosError<IResponseWrapper>) => {
      httpExceptionHandler(error);
    },
  });

  const searchHandler = (newSearchText: string) => {
    setProducts([]);
    setTotalCount(0);
    setSearchText(newSearchText);
  };

  const fetchMoreHandler = () => {
    if (productsResponse?.data && totalCount > products.length) {
      setParams(previosParams => {
        return {
          ...previosParams,
          rowsOffset: params.rowsOffset + 1,
        };
      });
    }
  };

  const refreshHandler = () => {
    if (searchText !== '') {
      setTotalCount(0);
      setProducts([]);
    }
    setSearchText('');
  };

  const successResponseHandler = (response: IDataList<IProduct>) => {
    setTotalCount(response.totalCount);
    setProducts(previosProducts => [...previosProducts, ...response.data]);
  };

  useEffect(() => {
    setParams(previosParams => ({
      ...previosParams,
      rowsOffset: 0,
      title: debouncedSearchText,
    }));
  }, [debouncedSearchText]);

  return (
    <GuardLayout>
      <MainLayout>
        <SafeAreaView style={styles.container}>
          <Input
            placeholder="Поиск по названию"
            keyboardType="default"
            cursorColor={colors.black['100']}
            onChangeText={searchHandler}
            value={searchText}
          />
          <FlatList
            refreshControl={
              <RefreshControl
                onRefresh={refreshHandler}
                refreshing={isLoading}
              />
            }
            data={products}
            renderItem={({ item }) => <Product {...item} />}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={1}
            ListEmptyComponent={<Text>Загрузка . . .</Text>}
            onEndReached={() => fetchMoreHandler()}
            // ListFooterComponent={ListEndLoader()}
          />
        </SafeAreaView>
      </MainLayout>
    </GuardLayout>
  );
};
