import { InlineKeyboard, Middleware } from 'grammy';
import { v4 } from 'uuid';
import { DOMAIN } from '@/config';
import { harvestService } from '@/core/services';
import { dataSource } from '@/data.source';
import { AuthBotContext } from '@/types/bot';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export const riceCommand: Middleware = async (ctx) => {
  const { user } = ctx as AuthBotContext;
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }

  let harvestLink = await harvestService.getUserHarvestLink(user);
  if (harvestLink) {
    const text = `${mention(user)}, ты уже собрался собирать рис!`;

    await ctx.reply(text, {
      reply_to_message_id: harvestLink.messageId,
      parse_mode: 'Markdown',
    });

    return;
  }

  const harvest = await harvestService.getUserHarvest(user);
  if (harvest && harvest.nextTime > new Date()) {
    const diff = harvest.nextTime.getTime() - new Date().getTime();
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

  const linkUUID = v4();

  const keyboard = new InlineKeyboard()
    .login('Отправиться на поля 👨‍🌾', {
      url: `https://${DOMAIN}?rid=${linkUUID}`,
    });

  const text = `${mention(user)}, пора за работу! 💪`;

  const message = await ctx.reply(text, {
    reply_markup: keyboard,
    parse_mode: 'Markdown',
  });

  harvestLink = await harvestService.createUserHarvestLink(linkUUID, user, chatId, message.message_id);
  await dataSource.manager.save(harvestLink);
};
