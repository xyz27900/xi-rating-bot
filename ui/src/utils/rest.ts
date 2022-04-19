import { ApiErrorCode, ApiErrorData } from '@xyz27900/xi-rating-bot-common/build/es/api/error';
import Axios, { AxiosRequestConfig as _AxiosRequestConfig, AxiosResponse } from 'axios';
import { arrayIncludes } from '@/utils/array';
import { objectValues } from '@/utils/object';

export type AxiosRequestConfig = _AxiosRequestConfig;

export type AxiosSucceedResponse<T> = AxiosResponse<T> & { __state: 'success' };
export type AxiosFailedResponse = { __state: 'failed', data: ApiErrorData };
export type AxiosReply<T extends object | ''> = Promise<AxiosSucceedResponse<T> | AxiosFailedResponse>;

const fixResponse = (response: any): AxiosFailedResponse => {
  const codes = objectValues(ApiErrorCode);
  let code = ApiErrorCode.InternalError;
  let message = 'Ошибка на сервере';

  if (response?.data?.code && arrayIncludes(codes, response.data.code)) {
    code = response.data.code;
  }

  if (response?.data?.message && typeof response.data.message === 'string') {
    message = response.data.message;
  }

  return {
    __state: 'failed',
    data: {
      code,
      message,
    },
  };
};

export class Rest {
  private static wrapper1(fn: typeof Axios.get) {
    return async <T extends object | ''>(path: string, config?: AxiosRequestConfig): AxiosReply<T> => {
      try {
        const response = await fn<T>(path, config);
        return {
          ...response,
          __state: 'success',
        };
      } catch (error) {
        return fixResponse(error.response);
      }
    };
  }

  private static wrapper2(fn: typeof Axios.post) {
    return async <T extends object | ''>(path: string, data?: any, config?: AxiosRequestConfig): AxiosReply<T> => {
      try {
        const response = await fn<T>(path, data, config);
        return {
          ...response,
          __state: 'success',
        };
      } catch (error) {
        return fixResponse(error.response);
      }
    };
  }

  public static async get<T extends object | ''>(path: string, config?: AxiosRequestConfig): AxiosReply<T> {
    return (await Rest.wrapper1(Axios.get))(path, config);
  }

  public static async post<T extends object | ''>(path: string, data?: any, config?: AxiosRequestConfig): AxiosReply<T> {
    return (await Rest.wrapper2(Axios.post))(path, data, config);
  }
}
