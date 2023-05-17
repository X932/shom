export class CreateProduct {
  title: string;
  imgPath: string;
  description: string;
  size: number;
  price: number;
}

export class BaseProduct extends CreateProduct {
  id: number;
  title: string;
}
