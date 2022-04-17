import { Context } from 'grammy';
import { dataSource } from '@/data.source';
import { User } from '@/entity/user.entity';
import { mention } from '@/utils/telegram';

export const joinCommand = async (ctx: Context): Promise<void> => {
  const from = ctx.message?.from;
  if (!from) {
    return;
  }

  let user = await dataSource.manager.findOneBy(User, { id: from.id });
  if (user) {
    const text = `${mention(user)}, Ты уже член партии. Гордись этим! 😉`;
    await ctx.reply(text, { parse_mode: 'Markdown' });
  } else {
    user = dataSource.manager.create(User, {
      id: from.id,
      rating: 300,
      firstName: from.first_name,
      lastName: from.last_name,
      username: from.username,
    });

    await dataSource.manager.save(user);

    const text = `${mention(user)}, ты присоединился к партии! 🥳`;
    await ctx.reply(text, { parse_mode: 'Markdown' });
  }
};
