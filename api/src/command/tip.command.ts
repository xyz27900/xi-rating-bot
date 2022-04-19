import { Middleware } from 'grammy';
import { tipService } from '@/service/tip.service';
import { AuthBotContext } from '@/types/bot';
import { mention } from '@/utils/telegram';

export const tipCommand: Middleware = async (ctx) => {
  const { user } = ctx as AuthBotContext;

  const payload = ctx.match;
  if (typeof payload === 'string') {
    const result = tipService.process(payload);
    const text = `${mention(user)}, ${result}`;

    await ctx.reply(text, { parse_mode: 'Markdown' });
  }
};
