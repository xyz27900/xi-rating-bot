import { Request, Response } from 'express';
import { bot } from '@/bot';
import { increaseBalance } from '@/bot/balance/increase.balance';
import { increaseRating } from '@/bot/rating/increase.rating';
import { dataSource } from '@/data.source';
import { RiceCollect } from '@/entity/rice.collect.entity';
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

  let riceCollect = await dataSource.manager.findOneBy(RiceCollect, {
    user: { id: user.id },
  });

  if (!riceCollect) {
    riceCollect = dataSource.manager.create(RiceCollect, { user });
  }

  riceCollect.nextTime = new Date(Date.now() + 1000 * 60 * 60 * 4);

  const finishHarvest = async (): Promise<void> => {
    // await bot.api.editMessageReplyMarkup(riceCollectLink.chatId, riceCollectLink.messageId);
    await dataSource.manager.save(riceCollect);
    await dataSource.manager.remove(riceCollectLink);
  };

  if (amount === 0) {
    const text = [
      `${mention(user)}, у тебя не получилось ничего собрать 🙁`,
      'Отдохни и попробуй еще раз 🙌',
    ].join('\n\n');

    await finishHarvest();
    await bot.api.sendMessage(riceCollectLink.chatId, text, { parse_mode: 'Markdown' });
  } else {
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

    await finishHarvest();
    await bot.api.sendMessage(riceCollectLink.chatId, text, { parse_mode: 'Markdown' });
  }

  res.status(200).send();
};
