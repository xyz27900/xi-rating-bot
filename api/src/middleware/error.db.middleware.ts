import * as Sentry from '@sentry/node';
import { logger } from '@xyz27900/xi-rating-bot-common/build/cjs/utils/logger';
import { TypeORMError } from 'typeorm';
import { errInternalError } from '@/error/api/errors';
import { ApiErrorHandler } from '@/types/api';

export const errorDbMiddleware: ApiErrorHandler = (err, req, res, next) => {
  if (err instanceof TypeORMError) {
    const transaction = Sentry.startTransaction({ name: 'TypeORMError' });
    Sentry.captureException(err);
    transaction.finish();

    logger.error(err.message, err.name);

    const error = errInternalError;
    res.status(error.status).send(error.data);
  } else {
    next(err);
  }
};
