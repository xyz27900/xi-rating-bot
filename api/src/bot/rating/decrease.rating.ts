import { MoreThan } from 'typeorm';
import { RatingFunctionArgs } from '@/bot/rating/types';
import { dataSource } from '@/data.source';
import { UserGift } from '@/entity/user.gift.entity';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export const decreaseRating = async (args: RatingFunctionArgs): Promise<string> => {
  const { user, value, reason } = args;

  if (user.rating === 0) {
    return [
      `${mention(user)} уже находится на дне нашего общества 👇`,
      'Его рейтинг равен нулю 😆',
    ].join('\n');
  }

  user.rating -= value;

  const giftsToRemove = await dataSource.manager.find(UserGift, {
    where: {
      user: { id: user.id },
      gift: { rating: MoreThan(user.rating) },
    },
    relations: ['gift'],
  });

  await dataSource.manager.save(user);
  await dataSource.manager.remove(giftsToRemove);

  const phrases = [
    'Великий вождь Xi недоволен тобой 😤',
    'Ты расстраиваешь нашего великого вождя ☹️',
    'Сейчас же прекрати позорить партию! 😡',
  ];

  return [
    reason,
    giftsToRemove.length > 0
      ? [
        '_Партия отбирает у тебя 😧_',
        ...giftsToRemove.map(userGift => `• ${userGift.gift.name}`),
      ].join('\n')
      : randomElement(phrases),
  ].join('\n\n');
};
