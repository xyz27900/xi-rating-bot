import * as Sentry from '@sentry/node';
import { logger } from '@xyz27900/xi-rating-bot-common/build/cjs/utils/logger';
import { BotError, GrammyError } from 'grammy';
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
