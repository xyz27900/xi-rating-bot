import { In, LessThanOrEqual, MoreThan, Not, Repository } from 'typeorm';
import { dataSource } from '@/data.source';
import { Gift } from '@/entity/gift.entity';
import { User } from '@/entity/user.entity';
import { UserGift } from '@/entity/user.gift.entity';

export class GiftService {
  private readonly giftRepository: Repository<Gift>;
  private readonly userGiftRepository: Repository<UserGift>;

  constructor(giftRepository: Repository<Gift>, userGiftRepository: Repository<UserGift>) {
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

export const giftService = new GiftService(
  dataSource.getRepository(Gift),
  dataSource.getRepository(UserGift),
);
