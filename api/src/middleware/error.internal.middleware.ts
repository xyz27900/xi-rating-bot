import * as Sentry from '@sentry/node';
import { errInternalError } from '@/error/api/errors';
import { ApiErrorHandler } from '@/types/api';

export const errorInternalMiddleware: ApiErrorHandler = (err, _req, res, _next) => {
  const transaction = Sentry.startTransaction({ name: 'InternalError' });
  Sentry.captureException(err);
  transaction.finish();

  const error = errInternalError;
  res.status(error.status).send(error.data);
};
