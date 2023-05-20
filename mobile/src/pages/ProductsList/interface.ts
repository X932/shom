interface IPrice {
  id: number;
  amount: number;
}

interface IDetail {
  id: number;
  size: number;
  price: IPrice;
}

export interface IProduct {
  id: number;
  title: string;
  imgPath: string;
  description: string;
  details: IDetail[];
}
