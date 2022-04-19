import { SaveArgs, SaveReply } from '@xyz27900/xi-rating-bot-common/build/es/dto/save.dto';
import { AxiosReply, AxiosRequestConfig, Rest } from '@/utils/rest';

export const save = (args: SaveArgs, config?: AxiosRequestConfig): AxiosReply<SaveReply> => {
  const params = new URLSearchParams();
  Object.entries(args.query).forEach(([key, value]) => {
    if (typeof value === 'string') {
      params.append(key, value);
    }
  });

  return Rest.post(`/api/save?${params}`, args.data, config);
};
