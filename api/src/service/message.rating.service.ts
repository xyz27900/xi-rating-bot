import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { MessageRating } from '@/entity/message.rating.entity';
import { User } from '@/entity/user.entity';
import { MESSAGE_RATING_REPOSITORY } from '@/repository/message.rating.repository';

@injectable()
export class MessageRatingService {
  private readonly messageRatingRepository: Repository<MessageRating>;

  constructor(@inject(MESSAGE_RATING_REPOSITORY) messageRatingRepository: Repository<MessageRating>) {
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
