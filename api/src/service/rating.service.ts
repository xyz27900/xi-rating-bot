import { Context } from 'grammy';
import { SELF_DECREASE_IMAGE_URL, SELF_INCREASE_IMAGE_URL } from '@/config';
import { User } from '@/entity/user.entity';
import { giftService as _giftService, GiftService } from '@/service/gift.service';
import { userService as _userService, UserService } from '@/service/user.service';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export class RatingService {
  private readonly userService: UserService;
  private readonly giftService: GiftService;

  constructor(userService: UserService, giftService: GiftService) {
    this.userService = userService;
    this.giftService = giftService;
  }

  public async increase(ctx: Context, messageId: number, userFrom: User, userTo: User): Promise<void> {
    if (userFrom.id === userTo.id) {
      const phrases = [
        'Ты думал, что ты умнее вождя? 🤨',
        'У тебя не получится обмануть партию 👊',
        'Злой хитрый Иван, у тебя ничего не получится 👎',
      ];

      await ctx.replyWithPhoto(SELF_INCREASE_IMAGE_URL, {
        reply_to_message_id: messageId,
        caption: randomElement(phrases),
      });
    } else {
      userTo.rating += 150;

      const gifts = await this.giftService.getGiftsToGive(userTo);
      const congratulatoryText = await this.giftService.giveGiftsToUser(userTo, gifts);
      await this.userService.save(userTo);

      const text = `${mention(userTo)}, *+150* баллов социального рейтинга 👍\n\n${congratulatoryText}`;
      await ctx.reply(text, { parse_mode: 'Markdown' });
    }
  }

  public async decrease(ctx: Context, messageId: number, userFrom: User, userTo: User): Promise<void> {
    if (userFrom.id === userTo.id) {
      const phrases = [
        'Во еблан 🤣',
        'Простой рабочий Иван, ты дурак 🤡',
        'Ты совершил ошибку, но партия прощает тебе это 😇',
      ];

      await ctx.replyWithPhoto(SELF_DECREASE_IMAGE_URL, {
        reply_to_message_id: messageId,
        caption: randomElement(phrases),
      });
    } else {
      userTo.rating -= 150;

      const gifts = await this.giftService.getGiftsToTake(userTo);
      const accusatoryText = await this.giftService.takeGiftsFromUser(userTo, gifts);
      await this.userService.save(userTo);

      const text = `${mention(userTo)}, *-150* баллов социального рейтинга 👎\n\n${accusatoryText}`;
      await ctx.reply(text, { parse_mode: 'Markdown' });
    }
  }
}

export const ratingService = new RatingService(_userService, _giftService);
