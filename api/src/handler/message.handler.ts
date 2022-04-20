import { Middleware } from 'grammy';
import { ratingService } from '@/service/rating.service';
import { userService } from '@/service/user.service';
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

  const userFrom = await userService.getUserById(from.id);
  const userTo = await userService.getUserById(to.id);

  if (!userFrom || !userTo) {
    return;
  }

  const messageRating = await ratingService.checkIfAlreadyRated(userFrom, replyMessage.message_id);
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
    await ratingService.increase(ctx, replyMessage.message_id, userFrom, userTo);
  } else if (messageText === '-') {
    await ratingService.decrease(ctx, replyMessage.message_id, userFrom, userTo);
  }
};
