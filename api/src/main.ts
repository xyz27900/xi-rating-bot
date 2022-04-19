import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { logger } from '@xyz27900/xi-rating-bot-common/build/cjs/utils/logger';
import { BOT_TOKEN, PORT, SENTRY_DSN } from '@/config';
import { initBot } from '@/core/bot';
import { initServer } from '@/core/server';
import { dataSource } from '@/data.source';
import { NODE_ENV } from '@/env';

const bootstrap = async (): Promise<void> => {
  await dataSource.initialize();

  const botRoute = `api/${BOT_TOKEN}`;

  const bot = await initBot(botRoute);
  const server = await initServer(bot, botRoute);

  server.listen(PORT, () => {
    logger.log(`Application launched in ${NODE_ENV.toUpperCase()} mode on port ${PORT}`, 'App');
  });
};

Tracing.addExtensionMethods();

Sentry.init({
  dsn: SENTRY_DSN,
  environment: NODE_ENV,
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: 'bootstrap',
  name: 'bootstrap',
});

bootstrap()
  .catch((err) => Sentry.captureException(err))
  .finally(() => transaction.finish());
