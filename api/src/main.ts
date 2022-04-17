import express from 'express';
import { webhookCallback } from 'grammy';
import { bot } from '@/bot';
import { dataSource } from '@/data.source';
import { isDevelopment, isProduction } from '@/env';
import { loginHandler } from '@/server/handlers/login.handler';
import { saveHandler } from '@/server/handlers/save.handler';

const bootstrap = async (): Promise<void> => {
  await dataSource.initialize();

  const domain = String(process.env.DOMAIN);
  const port = Number(process.env.PORT);
  const secretPath = String(process.env.BOT_TOKEN);
  const app = express();

  await bot.api.setMyCommands([
    { command: 'join', description: 'Присоединиться к партии' },
    { command: 'me', description: 'Узнать свой социальный рейтинг' },
    { command: 'rice', description: 'Отправиться собирать рис на полях империи' },
    { command: 'shop', description: 'Заглянуть в магазин' },
    { command: 'tip', description: 'Спросить у партии совет' },
    { command: 'help', description: 'Как пользоваться ботом' },
  ]);

  app.use(express.json());
  app.get('/api/login', loginHandler);
  app.post('/api/save', saveHandler);

  if (!isDevelopment) {
    app.use(express.static('public'));
    app.get('*', (_, res) => {
      res.sendFile('index.html', { root: 'public' });
    });
  }

  if (isProduction) {
    app.use(`/api/${secretPath}`, webhookCallback(bot, 'express'));
  }

  app.listen(port, async () => {
    if (isProduction) {
      await bot.api.setWebhook(`https://${domain}/api/${secretPath}`);
    } else {
      await bot.start();
    }
  });
};

bootstrap();
