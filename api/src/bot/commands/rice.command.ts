import { Context, InlineKeyboard } from 'grammy';
import { v4 } from 'uuid';
import { getUserHelper } from '@/bot/helpers/get.user.helper';
import { dataSource } from '@/data.source';
import { RiceCollect } from '@/entity/rice.collect.entity';
import { RiceCollectLink } from '@/entity/rice.collect.link.entity';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export const riceCommand = async (ctx: Context): Promise<void> => {
  const user = await getUserHelper(ctx);
  if (!user) {
    return;
  }

  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }

  let riceCollectLink = await dataSource.manager.findOneBy(RiceCollectLink, { user });
  if (riceCollectLink) {
    const text = `${mention(user)}, ты уже собрался собирать рис!`;

    await ctx.reply(text, {
      reply_to_message_id: riceCollectLink.messageId,
      parse_mode: 'Markdown',
    });

    return;
  }

  const riceCollect = await dataSource.manager.findOneBy(RiceCollect, {
    user: { id: user.id },
  });
  if (riceCollect && riceCollect.nextTime > new Date()) {
    const diff = riceCollect.nextTime.getTime() - new Date().getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const phrases = [
      'подожди немного ⏳',
      'поработал сам - дай поработать другим 👨‍🌾',
    ];

    const text = [
      `${mention(user)}, ${randomElement(phrases)}`,
      `Собирать рис снова можно будет через _${hours} ч ${minutes} мин_ ⽶`,
    ].join('\n');

    await ctx.reply(text, { parse_mode: 'Markdown' });

    return;
  }

  riceCollectLink = dataSource.manager.create(RiceCollectLink, {
    id: v4(),
    user,
    chatId,
  });

  const keyboard = new InlineKeyboard()
    .login('Отправиться на поля 👨‍🌾', {
      url: `https://${String(process.env.DOMAIN)}?rid=${riceCollectLink.id}`,
    });

  const text = `${mention(user)}, пора за работу! 💪`;
  const message = await ctx.reply(text, {
    reply_markup: keyboard,
    parse_mode: 'Markdown',
  });

  riceCollectLink.messageId = message.message_id;
  await dataSource.manager.save(riceCollectLink);
};
