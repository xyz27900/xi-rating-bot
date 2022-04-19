import { Middleware } from 'grammy';
import { dataSource } from '@/data.source';
import { MessageRating } from '@/entity/message.rating.entity';
import { User } from '@/entity/user.entity';
import { ratingService } from '@/service/rating.service';
import { mention } from '@/utils/telegram';

export const messageHandler: Middleware = async (ctx) => {
  const { from, message } = ctx;
  if (!message || !from) {
    return;
  }

  const { reply_to_message: replyMessage } = message;
  if (!replyMessage || !message.text) {
    return;
  }

  const messageText = message.text.trim();
  const { from: to } = replyMessage;
  if (!to) {
    return;
  }

  const userFrom = await dataSource.manager.findOneBy(User, { id: from.id });
  const userTo = await dataSource.manager.findOneBy(User, { id: to.id });

  if (!userFrom || !userTo) {
    return;
  }

  const messageRating = await dataSource.manager.findOneBy(MessageRating, {
    user: { id: from.id },
    messageId: replyMessage.message_id,
  });

  if (messageRating) {
    const text = [
      `${mention(userFrom)}, ты уже оценил это сообщение!`,
      'Великого вождя не обманешь! 😠',
    ].join('\n\n');

    await ctx.reply(text, {
      reply_to_message_id: replyMessage.message_id,
      parse_mode: 'Markdown',
    });
  } else if (messageText === '+') {
    await ratingService.increase(ctx, 150, userFrom, userTo);
  } else if (messageText === '-') {
    await ratingService.decrease(ctx, 150, userFrom, userTo);
  }
};
