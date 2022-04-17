import { Context } from 'grammy';
import { getUserHelper } from '@/bot/helpers/get.user.helper';
import { tipMechanics } from '@/bot/mechanics/tip.mechanics';

export const tipCommand = async (ctx: Context): Promise<void> => {
  const user = await getUserHelper(ctx);
  if (!user) {
    return;
  }

  const payload = ctx.match;
  if (typeof payload === 'string') {
    const text = tipMechanics(payload, user);
    await ctx.reply(text, { parse_mode: 'Markdown' });
  }
};
