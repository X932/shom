import { Dispatch, SetStateAction } from 'react';

export interface ISelectedProduct {
  productId: number;
  productTitle: string;
  branchTitle: string;
  productDetailsId: number;
  imgPath: string;
  quantity: number;
  priceAmount: number;
  size: number;
}

export interface ISelectedProductCardProps {
  setSelectedProducts: Dispatch<SetStateAction<ISelectedProduct[]>>;
  product: ISelectedProduct;
}
