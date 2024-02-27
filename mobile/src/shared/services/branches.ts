import { httpExceptionHandler } from '@utils';
import { IBranch, IResponseWrapper } from '@interfaces';
import { axiosInstance } from '@axios-instance';

enum Endpoints {
  BRANCHES = '/branches',
}

export const getBranchesAPI = async () => {
  try {
    const { data } = await axiosInstance<IResponseWrapper<IBranch[]>>({
      method: 'GET',
      url: Endpoints.BRANCHES,
    });
    return data.payload;
  } catch (error: any) {
    httpExceptionHandler(error);
  }
};
