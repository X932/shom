import { IAccount, IResponseWrapper } from '@interfaces';
import { axiosInstance } from '@axios-instance';

enum Endpoints {
  ACCOUNTS = '/accounts',
}

export const getAccountsAPI = async () => {
  const { data } = await axiosInstance<IResponseWrapper<IAccount[]>>({
    method: 'GET',
    url: Endpoints.ACCOUNTS,
  });
  return data.payload;
};
