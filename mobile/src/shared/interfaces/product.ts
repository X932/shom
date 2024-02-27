import { IInventory } from '@interfaces';
import { IPagination } from './pagination';

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

export type TProductParams = Partial<Pick<IProduct, 'id' | 'title'>> &
  IPagination;
