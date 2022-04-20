import { Middleware } from 'grammy';
import { dataSource } from '@/data.source';
import { userService } from '@/service/user.service';
import { mention } from '@/utils/telegram';

export const joinCommand: Middleware = async (ctx) => {
  const from = ctx.message?.from;
  if (!from) {
    return;
  }

  let user = await userService.getUserById(from.id);
  if (user) {
    const text = `${mention(user)}, Ты уже член партии. Гордись этим! 😉`;
    await ctx.reply(text, { parse_mode: 'Markdown' });
  } else {
    user = await userService.createUser({
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
