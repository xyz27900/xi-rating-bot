import { In, LessThanOrEqual, MoreThan, Not, Repository } from 'typeorm';
import { dataSource } from '@/data.source';
import { Gift } from '@/entity/gift.entity';
import { User } from '@/entity/user.entity';
import { UserGift } from '@/entity/user.gift.entity';
import { randomElement } from '@/utils/array';

export class GiftService {
  private readonly giftRepository: Repository<Gift>;
  private readonly userGiftRepository: Repository<UserGift>;

  constructor(giftRepository: Repository<Gift>, userGiftRepository: Repository<UserGift>) {
    this.giftRepository = giftRepository;
    this.userGiftRepository = userGiftRepository;
  }

  public async getUserGifts(user: User): Promise<Gift[]> {
    const userGifts = await this.userGiftRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['gift'],
    });
    return userGifts.map(userGift => userGift.gift);
  }

  public async getGiftsToGive(user: User): Promise<Gift[]> {
    const receivedGifts = await this.userGiftRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['gift'],
    });
    return await this.giftRepository.findBy({
      id: Not(In(receivedGifts.map(userGift => userGift.gift.id))),
      rating: LessThanOrEqual(user.rating),
    });
  }

  public async getGiftsToTake(user: User): Promise<UserGift[]> {
    return this.userGiftRepository.find({
      where: {
        user: { id: user.id },
        gift: { rating: MoreThan(user.rating) },
      },
      relations: ['gift'],
    });
  }

  public async giveGiftsToUser(user: User, gifts: Gift[]): Promise<string> {
    const userGifts = gifts.map(gift => {
      return this.userGiftRepository.create({ user, gift });
    });
    await this.userGiftRepository.save(userGifts);

    const phrases = [
      'Великий вождь Xi доволен тобой 😁',
      'Слава нашему великому вождю! 🤗',
      'Партия гордится тобой! 😎',
    ];

    return gifts.length > 0
      ? `_Ты получаешь от партии 🎉_\n${gifts.map(gift => `• ${gift.name}`).join('\n')}`
      : randomElement(phrases);
  }

  public async takeGiftsFromUser(user: User, gifts: UserGift[]): Promise<string> {
    await this.userGiftRepository.remove(gifts);

    const phrases = [
      'Великий вождь Xi недоволен тобой 😤',
      'Ты расстраиваешь нашего великого вождя ☹️',
      'Сейчас же прекрати позорить партию! 😡',
    ];

    return gifts.length > 0
      ? `_Партия отбирает у тебя 😧_\n${gifts.map(gift => `• ${gift.gift.name}`).join('\n')}`
      : randomElement(phrases);
  }
}

export const giftService = new GiftService(
  dataSource.getRepository(Gift),
  dataSource.getRepository(UserGift),
);
