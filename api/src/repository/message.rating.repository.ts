import { dataSource } from '@/data.source';
import { MessageRating } from '@/entity/message.rating.entity';

export const messageRatingRepository = dataSource.getRepository(MessageRating);
export const MESSAGE_RATING_REPOSITORY = Symbol('MessageRatingRepository');
