import { dataSource } from '@/data.source';
import { UserGift } from '@/entity/user.gift.entity';

export const userGiftRepository = dataSource.getRepository(UserGift);
export const USER_GIFT_REPOSITORY = Symbol('UserGiftRepository');
