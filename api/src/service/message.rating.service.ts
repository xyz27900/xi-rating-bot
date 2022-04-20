import { Repository } from 'typeorm';
import { dataSource } from '@/data.source';
import { MessageRating } from '@/entity/message.rating.entity';
import { User } from '@/entity/user.entity';

export class MessageRatingService {
  private readonly messageRatingRepository: Repository<MessageRating>;

  constructor(messageRatingRepository: Repository<MessageRating>) {
    this.messageRatingRepository = messageRatingRepository;
  }

  public createMessageRating(user: User, messageId: number): MessageRating {
    return this.messageRatingRepository.create({ messageId, user });
  }

  public async checkIfAlreadyRated(user: User, messageId: number): Promise<boolean> {
    const messageRating = await this.messageRatingRepository.findOneBy({
      user: { id: user.id },
      messageId,
    });
    return !!messageRating;
  }
}

export const ratingService = new MessageRatingService(dataSource.getRepository(MessageRating));
