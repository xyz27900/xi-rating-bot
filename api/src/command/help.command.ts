import { Middleware } from 'grammy';
import { FAQ_URL } from '@/config';

export const helpCommand: Middleware = async (ctx) => {
  const text = `[Здесь](${FAQ_URL}) рассказано как пользоваться ботом`;
  await ctx.reply(text, { parse_mode: 'Markdown' });
};
