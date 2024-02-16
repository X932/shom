import { IInventory } from '@interfaces';

interface IPrice {
  id: number;
  amount: number;
}

interface IDetail {
  id: number;
  size: number;
  price: IPrice;
  inventory: IInventory;
}

export interface IProduct {
  id: number;
  title: string;
  imgPath: string;
  description: string;
  details: IDetail[];
}

export type TProductParams = Pick<IProduct, 'id' | 'title'>;
