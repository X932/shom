export class BaseProduct {
  title: string;
  imgPath: string;
  description: string;
  size: number;
  price: number;
}

export class Product extends BaseProduct {
  id: number;
}
