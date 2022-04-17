import { Context } from 'grammy';
import { decreaseOperation } from '@/bot/operations/decrease.operation';
import { increaseOperation } from '@/bot/operations/increase.operation';
import { dataSource } from '@/data.source';
import { MessageRating } from '@/entity/message.rating.entity';
import { User } from '@/entity/user.entity';
import { mention } from '@/utils/telegram';

export const messageHandler = async (ctx: Context): Promise<void> => {
  const { from, message } = ctx;
  if (!message || !from) {
    return;
  }

  const { reply_to_message: replyMessage } = message;
  if (!replyMessage || !message.text) {
    return;
  }

  const messageText = message.text.trim();
  const { from: target } = replyMessage;
  if (!target) {
    return;
  }

  const fromUser = await dataSource.manager.findOneBy(User, { id: from.id });
  const targetUser = await dataSource.manager.findOneBy(User, { id: target.id });

  if (!fromUser || !targetUser) {
    return;
  }

  let messageRating = await dataSource.manager.findOneBy(MessageRating, {
    user: { id: from.id },
    messageId: replyMessage.message_id,
  });

  if (messageRating) {
    const text = [
      `${mention(fromUser)}, ты уже оценил это сообщение!`,
      'Великого вождя не обманешь! 😠',
    ].join('\n\n');

    await ctx.reply(text, {
      reply_to_message_id: replyMessage.message_id,
    });

    return;
  }

  const args = {
    ctx,
    messageId: message.message_id,
    from: fromUser,
    target: targetUser,
  };

  if (messageText !== '+' && messageText !== '-') {
    return;
  }

  messageRating = dataSource.manager.create(MessageRating, {
    messageId: replyMessage.message_id,
    user: fromUser,
  });

  await dataSource.manager.save(messageRating);

  if (messageText === '+') {
    await increaseOperation(args);
  } else if (messageText === '-') {
    await decreaseOperation(args);
  }
};
