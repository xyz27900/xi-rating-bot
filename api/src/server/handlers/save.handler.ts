import { Request, Response } from 'express';
import { bot } from '@/bot';
import { increaseBalance } from '@/bot/balance/increase.balance';
import { increaseRating } from '@/bot/rating/increase.rating';
import { dataSource } from '@/data.source';
import { getRiceCollectLinkHelper } from '@/server/helpers/get.rice.collect.link.helper';
import { getUserHelper } from '@/server/helpers/get.user.helper';
import { mention } from '@/utils/telegram';

export const saveHandler = async (req: Request, res: Response): Promise<void> => {
  const user = await getUserHelper({ req, res, ignoreFields: ['rid'] });
  if (!user) {
    return;
  }

  const riceCollectLink = await getRiceCollectLinkHelper({ req, res, user });
  if (!riceCollectLink) {
    return;
  }

  const { amount: amountStr } = req.body;
  const amount = Number(amountStr);
  if (isNaN(amount)) {
    res.status(400).send('Invalid amount');
    return;
  }

  if (amount === 0) {
    res.status(200).send();
    return;
  }

  const balanceValue = 10 * amount;
  const ratingValue = 5 * amount;

  const balanceText = await increaseBalance({ user, value: balanceValue });

  const text = await increaseRating({
    user,
    value: ratingValue,
    reason: [
      `${mention(user)}, рис собран 🌾`,
      `Твой рейтинг увеличился на *${ratingValue}* баллов 👍`,
      balanceText,
    ].join('\n'),
  });

  await bot.api.sendMessage(riceCollectLink.chatId, text, { parse_mode: 'Markdown' });
  await dataSource.manager.remove(riceCollectLink);

  res.status(200).send();
};
