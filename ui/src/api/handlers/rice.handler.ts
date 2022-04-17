import { SaveRiceArgs, SaveRiceReply } from '@/api/dto/rice.dto';
import { AxiosReply, AxiosRequestConfig, Rest } from '@/utils/rest';

export const saveRice = (args: SaveRiceArgs, config?: AxiosRequestConfig): AxiosReply<SaveRiceReply> => {
  const params = new URLSearchParams();
  Object.entries(args.query).forEach(([key, value]) => {
    if (typeof value === 'string') {
      params.append(key, value);
    }
  });

  return Rest.post(`/api/save?${params}`, args.data, config);
};
