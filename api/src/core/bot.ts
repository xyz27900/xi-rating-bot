import { logger } from '@xyz27900/xi-rating-bot-common/build/cjs/utils/logger';
import { Bot } from 'grammy';
import localtunnel from 'localtunnel';
import { shopCallback } from '@/callback/shop.callback';
import { helpCommand } from '@/command/help.command';
import { joinCommand } from '@/command/join.command';
import { meCommand } from '@/command/me.command';
import { riceCommand } from '@/command/rice.command';
import { shopCommand } from '@/command/shop.command';
import { tipCommand } from '@/command/tip.command';
import { BOT_TOKEN, DOMAIN, PORT } from '@/config';
import { isDevelopment } from '@/env';
import { messageHandler } from '@/handler/message.handler';
import { joinedMiddleware } from '@/middleware/joined.middleware';

export const initBot = async (botPath: string): Promise<Bot> => {
  bot.command('join', joinCommand);
  bot.command('help', helpCommand);
  bot.command('me', joinedMiddleware, meCommand);
  bot.command('rice', joinedMiddleware, riceCommand);
  bot.command('shop', joinedMiddleware, shopCommand);
  bot.command('tip', joinedMiddleware, tipCommand);
  bot.callbackQuery(/shop:\d/, shopCallback);
  bot.on('message', messageHandler);

  await bot.api.setMyCommands([
    { command: 'join', description: 'Присоединиться к партии' },
    { command: 'me', description: 'Узнать свой социальный рейтинг' },
    { command: 'rice', description: 'Отправиться собирать рис на полях империи' },
    { command: 'shop', description: 'Заглянуть в магазин' },
    { command: 'tip', description: 'Спросить у партии совет' },
    { command: 'help', description: 'Как пользоваться ботом' },
  ]);

  let url: string;
  if (isDevelopment) {
    const tunnel = await localtunnel(PORT);
    url = tunnel.url;
    logger.log(`Webhook URL ${url} was set`, 'Bot');
  } else {
    url = `https://${DOMAIN}`;
  }

  await bot.api.setWebhook(`${url}/${botPath}`);

  return bot;
};

export const bot = new Bot(BOT_TOKEN);
