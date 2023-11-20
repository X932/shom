interface IPrice {
  id?: number;
  amount: string;
}

export interface IUpdateDetail {
  id?: number;
  size: string;
  price: IPrice;
}

export interface IUpdateProductForm {
  id: number;
  title: string;
  description: string;
  details: IUpdateDetail[];
}
