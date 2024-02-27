import { Tab } from '@rneui/base';
import { FC, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { getProductsAPI } from '@services';
import {
  IDataList,
  IProduct,
  IResponseWrapper,
  TProductParams,
} from '@interfaces';
import { AxiosError } from 'axios';
import { httpExceptionHandler } from '@utils';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDebounce } from '@hooks';
import { Input } from '@components';
import { colors } from '@styles';
import { ProductCard } from '../ProductCard';
import { SelectedProductCard } from '../SelectedProductCard';
import { IProductsListProps } from './interface';
import { styles } from './styles';
import { ProductsTabIndex } from './constants';

const INITIAL_PARAMS: TProductParams = {
  rowsLimit: 2,
  rowsOffset: 0,
};

export const ProductsList: FC<IProductsListProps> = ({
  selectedProducts,
  setSelectedProducts,
  totalSelectedProductsData,
}) => {
  const [params, setParams] = useState<TProductParams>(INITIAL_PARAMS);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(
    ProductsTabIndex.ALL_PRODUCTS,
  );

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

  const successResponseHandler = (response: IDataList<IProduct>) => {
    setTotalCount(response.totalCount);
    setProducts(previosProducts => [...previosProducts, ...response.data]);
  };

  const refreshHandler = () => {
    if (searchText !== '') {
      setTotalCount(0);
      setProducts([]);
    }
    setSearchText('');
  };

  const getTabLabel = (): string =>
    `Выб-ые продукты (${totalSelectedProductsData.totalCount})`;

  useEffect(() => {
    setParams(previosParams => ({
      ...previosParams,
      rowsOffset: 0,
      title: debouncedSearchText,
    }));
  }, [debouncedSearchText]);

  return (
    <View style={styles.container}>
      <Tab
        dense
        value={activeTabIndex}
        onChange={setActiveTabIndex}
        style={styles.tabContainer}
        indicatorStyle={styles.tabIndicator}
        titleStyle={styles.tabTitle}>
        <Tab.Item>Все продукты</Tab.Item>
        <Tab.Item>{getTabLabel()}</Tab.Item>
      </Tab>

      {activeTabIndex === ProductsTabIndex.ALL_PRODUCTS ? (
        <>
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
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                setSelectedProducts={setSelectedProducts}
              />
            )}
            style={styles.listContainer}
            ListEmptyComponent={<Text>Загрузка . . .</Text>}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={1}
            onEndReached={() => fetchMoreHandler()}
          />
        </>
      ) : (
        <FlatList
          data={selectedProducts}
          renderItem={({ item }) => (
            <SelectedProductCard
              product={item}
              setSelectedProducts={setSelectedProducts}
            />
          )}
          ListEmptyComponent={<Text>Пусто</Text>}
          keyExtractor={item => String(item.productDetailsId)}
          onEndReachedThreshold={0.7}
        />
      )}
    </View>
  );
};
