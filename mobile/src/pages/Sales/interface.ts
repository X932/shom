export interface ISaleForm {
  accountId: string;
  discount: string;
}

export interface IOrderDetails {
  productId: number;
  productDetailsId: number;
  quantity: number;
}

export interface ISaleRequestBody extends ISaleForm {
  details: IOrderDetails[];
}
