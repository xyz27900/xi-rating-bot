import { In, LessThanOrEqual, Not } from 'typeorm';
import { RatingFunctionArgs } from '@/bot/rating/types';
import { dataSource } from '@/data.source';
import { Gift } from '@/entity/gift.entity';
import { UserGift } from '@/entity/user.gift.entity';
import { randomElement } from '@/utils/array';

export const increaseRating = async (args: RatingFunctionArgs): Promise<string> => {
  const { user, value, reason } = args;

  user.rating += value;

  const receivedGifts = await dataSource.manager.find(UserGift, {
    where: {
      user: { id: user.id },
    },
    relations: ['gift'],
  });

  const giftsToReceive = await dataSource.manager.find(Gift, {
    where: {
      id: Not(In(receivedGifts.map(userGift => userGift.gift.id))),
      rating: LessThanOrEqual(user.rating),
    },
  });

  const newUserGifts = giftsToReceive.map(gift => {
    return dataSource.manager.create(UserGift, { gift, user });
  });

  await dataSource.manager.save(user);
  await dataSource.manager.save(newUserGifts);

  const phrases = [
    'Великий вождь Xi доволен тобой 😁',
    'Слава нашему великому вождю! 🤗',
    'Партия гордится тобой! 😎',
  ];

  return [
    reason,
    giftsToReceive.length > 0
      ? [
        '_Ты получаешь от партии 🎉_',
        ...giftsToReceive.map(gift => `• ${gift.name}`),
      ].join('\n')
      : randomElement(phrases),
  ].join('\n\n');
};
