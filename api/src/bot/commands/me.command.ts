import { Context } from 'grammy';
import { getUserHelper } from '@/bot/helpers/get.user.helper';
import { dataSource } from '@/data.source';
import { UserGift } from '@/entity/user.gift.entity';
import { UserTool } from '@/entity/user.tool.entity';
import { mention } from '@/utils/telegram';

export const meCommand = async (ctx: Context): Promise<void> => {
  const user = await getUserHelper(ctx);
  if (!user) {
    return;
  }

  const userTools = await dataSource.manager.find(UserTool, {
    where: { user },
    relations: ['tool'],
  });

  const userGifts = await dataSource.manager.find(UserGift, {
    where: { user },
    relations: ['gift'],
  });

  const dataText = [
    `Социальный рейтинг *${user.rating}*`,
    `В кошельке *Ұ${user.balance}*`,
  ].join('\n');

  const toolsText = userTools.length > 0
    ? [
      '*Инструменты 🛠*',
      ...userTools.map(userTool => `• ${userTool.tool.description}`),
    ].join('\n')
    : 'В твоем инвентаре пока что пусто 🚫';

  const giftsText = userGifts.length > 0
    ? [
      '*Подарки от партии 🎁*',
      ...userGifts.map(userGift => `• ${userGift.gift.name}`),
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
