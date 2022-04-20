import { SaveReply } from '@xyz27900/xi-rating-bot-common/build/cjs/dto/save.dto';
import { bot } from '@/core/bot';
import { dataSource } from '@/data.source';
import { errInvalidAmount } from '@/error/api/errors';
import { giftService } from '@/service/gift.service';
import { riceService } from '@/service/rice.service';
import { ApiRouteHandler, AuthApiRequest } from '@/types/api';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export const saveRoute: ApiRouteHandler<SaveReply> = async (req, res) => {
  const { user, harvestLink } = req as AuthApiRequest;

  const { value: valueStr } = req.body;
  const value = Number(valueStr);
  if (isNaN(value)) {
    throw errInvalidAmount;
  }

  let text: string;

  if (value > 0) {
    const ratingValue = 5 * value;
    const balanceValue = 10 * value;

    user.rating += ratingValue;
    user.balance += balanceValue;

    const gifts = await giftService.getGiftsToGive(user);
    const userGifts = await giftService.createUserGifts(user, gifts);

    await dataSource.manager.save(userGifts);
    await dataSource.manager.save(user);

    const phrases = [
      'Великий вождь Xi доволен тобой 😁',
      'Слава нашему великому вождю! 🤗',
      'Партия гордится тобой! 😎',
    ];

    const dataText = [
      `${mention(user)}, рис собран 🌾`,
      `Твой рейтинг увеличился на *${ratingValue}* баллов 👍`,
      `Твой кошелек пополнился на *Ұ${balanceValue}* 🤑`,
    ].join('\n');

    const congratulationText = gifts.length > 0
      ? `*Ты получаешь от партии 🎉*\n${gifts.map(gift => `• ${gift.name}`).join('\n')}`
      : randomElement(phrases);

    text = `${dataText}\n\n${congratulationText}`;
  } else {
    text = [
      `${mention(user)}, у тебя не получилось ничего собрать 🙁`,
      'Отдохни и попробуй еще раз 🙌',
    ].join('\n\n');
  }

  const harvest = await riceService.updateUserHarvest(user);
  await dataSource.manager.save(harvest);
  await dataSource.manager.remove(harvestLink);

  res.status(200).send();

  await bot.api.sendMessage(harvestLink.chatId, text, { parse_mode: 'Markdown' });
  await bot.api.deleteMessage(harvestLink.chatId, harvestLink.messageId);
};
