import * as dotenv from 'dotenv';
import { Bot } from 'grammy';
import { shopCallback } from '@/bot/callbacks/shop.callback';
import { helpCommand } from '@/bot/commands/help.command';
import { joinCommand } from '@/bot/commands/join.command';
import { meCommand } from '@/bot/commands/me.command';
import { riceCommand } from '@/bot/commands/rice.command';
import { shopCommand } from '@/bot/commands/shop.command';
import { tipCommand } from '@/bot/commands/tip.command';
import { messageHandler } from '@/bot/handlers/message.handler';

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('No token provided');
}

export const bot = new Bot(token);

bot.command('join', joinCommand);
bot.command('me', meCommand);
bot.command('rice', riceCommand);
bot.command('shop', shopCommand);
bot.command('tip', tipCommand);
bot.command('help', helpCommand);
bot.callbackQuery(/shop:\d/, shopCallback);
bot.on('message', messageHandler);
