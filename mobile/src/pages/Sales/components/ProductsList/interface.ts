import { Dispatch, SetStateAction } from 'react';
import { ISelectedProduct } from '../SelectedProductCard/interface';
import { ITotalProductsData } from '../../interface';

export interface IProductsListProps {
  selectedProducts: ISelectedProduct[];
  setSelectedProducts: Dispatch<SetStateAction<ISelectedProduct[]>>;
  totalSelectedProductsData: ITotalProductsData;
}
