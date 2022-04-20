import { Context } from 'grammy';
import { Repository } from 'typeorm';
import { SELF_DECREASE_IMAGE_URL, SELF_INCREASE_IMAGE_URL } from '@/config';
import { dataSource } from '@/data.source';
import { MessageRating } from '@/entity/message.rating.entity';
import { User } from '@/entity/user.entity';
import { giftService as _giftService, GiftService } from '@/service/gift.service';
import { userService as _userService, UserService } from '@/service/user.service';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export class RatingService {
  private readonly messageRatingRepository: Repository<MessageRating>;
  private readonly userService: UserService;
  private readonly giftService: GiftService;

  constructor(
    messageRatingRepository: Repository<MessageRating>,
    userService: UserService,
    giftService: GiftService
  ) {
    this.messageRatingRepository = messageRatingRepository;
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
      const messageRating = this.messageRatingRepository.create({ user: userFrom, messageId });

      await this.userService.save(userTo);
      await this.messageRatingRepository.save(messageRating);

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
      const messageRating = this.messageRatingRepository.create({ user: userFrom, messageId });

      await this.userService.save(userTo);
      await this.messageRatingRepository.save(messageRating);

      const text = `${mention(userTo)}, *-150* баллов социального рейтинга 👎\n\n${accusatoryText}`;
      await ctx.reply(text, { parse_mode: 'Markdown' });
    }
  }

  public async checkIfAlreadyRated(user: User, messageId: number): Promise<boolean> {
    const messageRating = await this.messageRatingRepository.findOneBy({
      user: { id: user.id },
      messageId,
    });
    return !!messageRating;
  }
}

export const ratingService = new RatingService(
  dataSource.getRepository(MessageRating),
  _userService,
  _giftService
);
