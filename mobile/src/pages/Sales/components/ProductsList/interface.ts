import { Dispatch, SetStateAction } from 'react';
import { ISelectedProduct } from '../SelectedProductCard/interface';
import { IProduct } from '../../../ProductsList/interface';

export interface IProductsListProps {
  selectedProducts: ISelectedProduct[];
  setSelectedProducts: Dispatch<SetStateAction<ISelectedProduct[]>>;
  products: IProduct[];
}
