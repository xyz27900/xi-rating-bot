import { ApiErrorHandler } from '@/types/api';

export const errorInternalMiddleware: ApiErrorHandler = (err, _, res) => {
  res.status(500).json({
    code: 9999,
    message: 'Internal Server Error',
  });
};
