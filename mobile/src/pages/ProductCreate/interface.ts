interface IPrice {
  amount: string;
}

interface IDetail {
  quantity: string;
  branchId: string;
  size: string;
  price: IPrice;
}

export interface ICreateProductForm {
  title: string;
  description: string;
  details: IDetail[];
}
