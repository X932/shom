import { axiosInstance } from '@axios-instance';
import {
  IResponseWrapper,
  IProduct,
  TProductParams,
  IDataList,
} from '@interfaces';

enum Endpoints {
  PRODUCTS = '/products',
}

export const getProductsAPI = async (params: TProductParams) => {
  const { data } = await axiosInstance<IResponseWrapper<IDataList<IProduct>>>({
    method: 'GET',
    url: Endpoints.PRODUCTS,
    params: params,
  });
  return data.payload;
};
