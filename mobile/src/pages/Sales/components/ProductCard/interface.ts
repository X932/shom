import { Dispatch, SetStateAction } from 'react';
import { IProduct } from '@interfaces';
import { ISelectedProduct } from '../SelectedProductCard/interface';

export interface IProductCardProps {
  setSelectedProducts: Dispatch<SetStateAction<ISelectedProduct[]>>;
  product: IProduct;
}
