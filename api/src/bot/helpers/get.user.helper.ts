import { Context } from 'grammy';
import { dataSource } from '@/data.source';
import { User } from '@/entity/user.entity';

export const getUserHelper = async (ctx: Context): Promise<User | null> => {
  const { message } = ctx;
  if (!message || !message.from) {
    return null;
  }

  const user = await dataSource.manager.findOneBy(User, { id: message.from.id });
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

    return null;
  }

  return user;
};
