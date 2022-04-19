import { logger } from '@xyz27900/xi-rating-bot-common/build/cjs/utils/logger';
import { ApiError } from '@/error/api';
import { ApiErrorHandler } from '@/types/api';

export const errorApiMiddleware: ApiErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const context = 'user' in req ? `User ${req.user.id}` : '';
    logger.error(err.data.message, context);
    res.status(err.status).send(err.data);
  } else {
    next(err);
  }
};
