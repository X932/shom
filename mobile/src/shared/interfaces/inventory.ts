import { IBranch } from './branch';

export interface IInventory {
  id: string;
  quantity: number;
  createdAt: string;
  branch: IBranch;
}
