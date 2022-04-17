import { Context } from 'grammy';

export const helpCommand = async (ctx: Context): Promise<void> => {
  const text = `[Здесь](${String(process.env.FAQ_URL)}) рассказано как пользоваться ботом`;
  await ctx.reply(text, { parse_mode: 'Markdown' });
};
