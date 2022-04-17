import crypto from 'crypto';

interface Query {
  [key: string]: undefined | string | string[] | Query | Query[];
}

export const hashValidator = (args: Query): boolean => {
  const { hash, ...params } = args;

  const dataString = Object.entries(params)
    .sort()
    .map(entry => {
      const [key, value] = entry;
      return `${key}=${value}`;
    })
    .join('\n');

  const secret = crypto.createHash('sha256')
    .update(String(process.env.BOT_TOKEN))
    .digest();

  const hmac = crypto.createHmac('sha256', secret)
    .update(dataString)
    .digest('hex');

  return hmac === hash;
};
