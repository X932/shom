import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { IStatisticParams, IStatisticResponse } from './interface';

enum Endpoints {
  STATISTIC = '/accounts-history/statistic',
}

export const getStatisticAPI = async (params: IStatisticParams) => {
  const { data } = await axiosInstance<IResponseWrapper<IStatisticResponse>>({
    method: 'GET',
    url: Endpoints.STATISTIC,
    params: params,
  });
  return data.payload;
};
