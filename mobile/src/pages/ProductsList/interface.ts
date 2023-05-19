interface IPrice {
  id: number;
  amount: number;
}

interface IDetail {
  id: number;
  size: number;
  description: string;
  price: IPrice;
}

export interface IProduct {
  id: number;
  title: string;
  imgPath: string;
  details: IDetail[];
}
