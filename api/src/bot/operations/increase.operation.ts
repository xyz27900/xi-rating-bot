import { OperationFn } from '@/bot/operations/types';
import { increaseRating } from '@/bot/rating/increase.rating';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export const increaseOperation: OperationFn = async (args) => {
  const { ctx, messageId, from, target } = args;

  if (from.id === target.id) {
    const phrases = [
      'Ты думал, что ты умнее вождя? 🤨',
      'У тебя не получится обмануть партию 👊',
      'Злой хитрый Иван, у тебя ничего не получится 👎',
    ];

    await ctx.replyWithPhoto(String(process.env.SELF_INCREASE_IMAGE), {
      reply_to_message_id: messageId,
      caption: randomElement(phrases),
    });

    return;
  }

  const text = await increaseRating({
    user: target,
    value: 150,
    reason: `${mention(target)}, *+150* баллов социального рейтинга 👍`,
  });

  await ctx.reply(text, { parse_mode: 'Markdown' });
};
