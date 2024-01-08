import { IInventory } from '@interfaces';

interface IPrice {
  id?: number;
  amount: string;
}

interface ICreateUpdateInventory
  extends Partial<Omit<IInventory, 'quantity' | 'id'>> {
  quantity: string;
}

export interface IUpdateDetail {
  id?: number;
  inventory: ICreateUpdateInventory;
  size: string;
  price: IPrice;
}

export interface IUpdateProductForm {
  id: number;
  title: string;
  description: string;
  details: IUpdateDetail[];
}
