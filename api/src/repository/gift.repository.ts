import { dataSource } from '@/data.source';
import { Gift } from '@/entity/gift.entity';

export const giftRepository = dataSource.getRepository(Gift);
export const GIFT_REPOSITORY = Symbol('GiftRepository');

