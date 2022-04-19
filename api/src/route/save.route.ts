import { SaveReply } from '@xyz27900/xi-rating-bot-common/build/cjs/dto/save.dto';
import { bot } from '@/bot';
import { errInvalidAmount } from '@/error/api/errors';
import { giftService } from '@/service/gift.service';
import { riceService } from '@/service/rice.service';
import { userService } from '@/service/user.service';
import { ApiRouteHandler, AuthApiRequest } from '@/types/api';
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

    const dataText = [
      `${mention(user)}, рис собран 🌾`,
      `Твой рейтинг увеличился на *${ratingValue}* баллов 👍`,
      `Твой кошелек пополнился на *Ұ${balanceValue}* 🤑`,
    ].join('\n');

    const gifts = await giftService.getGiftsToGive(user);
    const congratulationText = await giftService.giveGiftsToUser(user, gifts);
    await userService.save(user);

    text = `${dataText}\n\n${congratulationText}`;
  } else {
    text = [
      `${mention(user)}, у тебя не получилось ничего собрать 🙁`,
      'Отдохни и попробуй еще раз 🙌',
    ].join('\n\n');
  }

  await riceService.collectRice(user, harvestLink);

  res.status(200).send();

  await bot.api.sendMessage(harvestLink.chatId, text, { parse_mode: 'Markdown' });
  await bot.api.editMessageReplyMarkup(harvestLink.chatId, harvestLink.messageId);
};
