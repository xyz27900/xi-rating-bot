import Axios, { AxiosRequestConfig as _AxiosRequestConfig, AxiosResponse } from 'axios';

export type AxiosRequestConfig = _AxiosRequestConfig;

export type AxiosSucceedResponse<T> = AxiosResponse<T> & { __state: 'success' };
export type AxiosFailedResponse = { __state: 'failed' };
export type AxiosReply<T extends object | ''> = Promise<AxiosSucceedResponse<T> | AxiosFailedResponse>;

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
        return {
          __state: 'failed',
        };
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
        return {
          __state: 'failed',
        };
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
