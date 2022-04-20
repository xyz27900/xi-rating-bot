import { Middleware } from 'grammy';
import { giftService, toolService } from '@/core/services';
import { AuthBotContext } from '@/types/bot';
import { mention } from '@/utils/telegram';

export const meCommand: Middleware = async (ctx) => {
  const { user } = ctx as AuthBotContext;

  const userTools = await toolService.getUserTools(user);
  const userGifts = await giftService.getUserGifts(user);

  const dataText = [
    `Социальный рейтинг *${user.rating}*`,
    `В кошельке *Ұ${user.balance}*`,
  ].join('\n');

  const toolsText = userTools.length > 0
    ? [
      '*Инструменты 🛠*',
      ...userTools.map(tool => `• ${tool.description}`),
    ].join('\n')
    : 'В твоем инвентаре пока что пусто 🚫';

  const giftsText = userGifts.length > 0
    ? [
      '*Подарки от партии 🎁*',
      ...userGifts.map(gift => `• ${gift.name}`),
    ].join('\n')
    : 'Ты плохо себя вел и ещё не получил ни одного подарка от партии 😢';

  const text = [
    mention(user),
    dataText,
    toolsText,
    giftsText,
  ].join('\n\n');

  await ctx.reply(text, { parse_mode: 'Markdown' });
};
