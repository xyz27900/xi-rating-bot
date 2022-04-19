import crypto from 'crypto';
import { BOT_TOKEN } from '@/config';
import { ApiQuery } from '@/types/api';

export const hashValidator = (args: ApiQuery): boolean => {
  const { hash, ...params } = args;

  const dataString = Object.entries(params)
    .sort()
    .map(entry => {
      const [key, value] = entry;
      return `${key}=${value}`;
    })
    .join('\n');

  const secret = crypto.createHash('sha256')
    .update(BOT_TOKEN)
    .digest();

  const hmac = crypto.createHmac('sha256', secret)
    .update(dataString)
    .digest('hex');

  return hmac === hash;
};
