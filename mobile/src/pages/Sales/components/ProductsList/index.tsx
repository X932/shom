import { Tab } from '@rneui/base';
import { FC, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ProductCard } from '../ProductCard';
import { SelectedProductCard } from '../SelectedProductCard';
import { IProductsListProps } from './interface';
import { styles } from './styles';
import { ProductsTabIndex } from './constants';

export const ProductsList: FC<IProductsListProps> = ({
  products,
  selectedProducts,
  setSelectedProducts,
  totalSelectedProductsData,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(
    ProductsTabIndex.ALL_PRODUCTS,
  );

  const getTabLabel = (): string =>
    `Выб-ые продукты (${totalSelectedProductsData.totalCount})`;

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
        <FlatList
          // TODO create fetch more logic
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              setSelectedProducts={setSelectedProducts}
            />
          )}
          ListEmptyComponent={<Text>Пусто</Text>}
          keyExtractor={item => String(item.id)}
          onEndReachedThreshold={0.7}
          onEndReached={() => console.log('end of list')}
        />
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
