import { LoginArgs, LoginReply } from '@/api/dto/auth.dto';
import { AxiosReply, AxiosRequestConfig, Rest } from '@/utils/rest';

export const login = (args: LoginArgs, config?: AxiosRequestConfig): AxiosReply<LoginReply> => {
  const params = new URLSearchParams();
  Object.entries(args).forEach(([key, value]) => {
    if (typeof value === 'string') {
      params.append(key, value);
    }
  });

  return Rest.get(`/api/login?${params.toString()}`, config);
};