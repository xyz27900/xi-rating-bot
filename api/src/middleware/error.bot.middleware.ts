import * as Sentry from '@sentry/node';
import { BotError, GrammyError } from 'grammy';
import { logger } from 'social-credits-common/build/es/utils/logger';
import { ApiErrorHandler } from '@/types/api';

export const errorBotMiddleware: ApiErrorHandler = async (err, req, res, next) => {
  const captureException = (name: 'BotError' | 'GrammyError'): void => {
    const transaction = Sentry.startTransaction({ name });
    Sentry.captureException(err);
    transaction.finish();
  };

  if (err instanceof BotError) {
    captureException('BotError');
    logger.error(err.message, err.name);

    await err.ctx.reply('Произошла ошибка 😢');
    res.status(200).send();
  } else if (err instanceof GrammyError) {
    captureException('GrammyError');
    logger.error(err.message, err.name);
  } else {
    next(err);
  }
};
