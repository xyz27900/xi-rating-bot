import * as Sentry from '@sentry/node';
import { logger } from 'social-credits-common/build/cjs/utils/logger';
import { TypeORMError } from 'typeorm';
import { ApiErrorHandler } from '@/types/api';

export const errorDbMiddleware: ApiErrorHandler = (err, req, res, next) => {
  if (err instanceof TypeORMError) {
    const transaction = Sentry.startTransaction({
      name: 'TypeORMError',
    });
    Sentry.captureException(err);
    transaction.finish();

    logger.error(err.message, err.name);

    res.status(500).json({
      code: 9999,
      message: 'Internal Server Error',
    });
  } else {
    next(err);
  }
};
