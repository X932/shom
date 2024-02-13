import { Dispatch, SetStateAction } from 'react';
import { ISelectedProduct } from '../SelectedProductCard/interface';
import { IProduct } from '../../../ProductsList/interface';

export interface IProductCardProps {
  setSelectedProducts: Dispatch<SetStateAction<ISelectedProduct[]>>;
  product: IProduct;
}
