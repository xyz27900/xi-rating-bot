import { OperationFn } from '@/bot/operations/types';
import { decreaseRating } from '@/bot/rating/decrease.rating';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export const decreaseOperation: OperationFn = async (args) => {
  const { ctx, messageId, from, target } = args;

  if (from.id === target.id) {
    const phrases = [
      'Во еблан 🤣',
      'Простой Иван ты дурак 🤡',
      'Ты совершил ошибку, но партия прощает тебе это 😇',
    ];

    await ctx.replyWithPhoto(String(process.env.SELF_DECREASE_IMAGE), {
      reply_to_message_id: messageId,
      caption: randomElement(phrases),
    });

    return;
  }

  const text = await decreaseRating({
    user: target,
    value: 150,
    reason: `${mention(target)}, *-150* баллов социального рейтинга 👎`,
  });

  await ctx.reply(text, { parse_mode: 'Markdown' });
};
