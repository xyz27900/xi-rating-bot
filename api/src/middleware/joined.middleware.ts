import { MiddlewareFn } from 'grammy';
import { userService } from '@/core/services';
import { AuthBotContext } from '@/types/bot';

export const joinedMiddleware: MiddlewareFn = async (ctx, next) => {
  const { message } = ctx;
  if (!message || !message.from) {
    return;
  }

  const user = await userService.getUserById(message.from.id);
  if (!user) {
    const text = [
      'Ты не член партии',
      'Тебе должно быть стыдно 🙈',
      'Чтобы присоединиться к партии, напиши /join',
    ].join('\n');

    await ctx.reply(text, {
      reply_to_message_id: message.message_id,
      parse_mode: 'Markdown',
    });
  } else {
    (ctx as AuthBotContext).user = user;
    await next();
  }
};
