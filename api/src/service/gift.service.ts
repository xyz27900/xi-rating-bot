import { inject, injectable } from 'tsyringe';
import { In, LessThanOrEqual, MoreThan, Not, Repository } from 'typeorm';
import { Gift } from '@/entity/gift.entity';
import { User } from '@/entity/user.entity';
import { UserGift } from '@/entity/user.gift.entity';
import { GIFT_REPOSITORY } from '@/repository/gift.repository';
import { USER_GIFT_REPOSITORY } from '@/repository/user.gift.repository';

@injectable()
export class GiftService {
  private readonly giftRepository: Repository<Gift>;
  private readonly userGiftRepository: Repository<UserGift>;

  constructor(
    @inject(GIFT_REPOSITORY) giftRepository: Repository<Gift>,
    @inject(USER_GIFT_REPOSITORY) userGiftRepository: Repository<UserGift>
  ) {
    this.giftRepository = giftRepository;
    this.userGiftRepository = userGiftRepository;
  }

  public async createUserGifts(user: User, gifts: Gift[]): Promise<UserGift[]> {
    return gifts.map(gift => {
      return this.userGiftRepository.create({ user, gift });
    });
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
}
