import { Repository } from 'typeorm';
import { dataSource } from '@/data.source';
import { RiceCollect } from '@/entity/rice.collect.entity';
import { RiceCollectLink } from '@/entity/rice.collect.link.entity';
import { User } from '@/entity/user.entity';
import { randomSubjects } from '@/utils/subject';

export class RiceService {
  private readonly riceCollectRepository: Repository<RiceCollect>;
  private readonly riceCollectLinkRepository: Repository<RiceCollectLink>;

  constructor(
    riceCollectRepository: Repository<RiceCollect>,
    riceCollectLinkRepository: Repository<RiceCollectLink>
  ) {
    this.riceCollectRepository = riceCollectRepository;
    this.riceCollectLinkRepository = riceCollectLinkRepository;
  }

  public async getUserRiceCollect(user: User): Promise<RiceCollect | null> {
    return await this.riceCollectRepository.findOneBy({
      user: { id: user.id },
    });
  }

  public async createUserCollectLink(id: string, user: User, chatId: number, messageId: number): Promise<RiceCollectLink> {
    const riceCollectLink = this.riceCollectLinkRepository.create({
      id,
      user,
      chatId,
      messageId,
      subjects: ['empty', ...randomSubjects(35)],
    });
    await this.riceCollectLinkRepository.save(riceCollectLink);
    return riceCollectLink;
  }

  public async getUserRiceCollectLink(user: User): Promise<RiceCollectLink | null> {
    return await this.riceCollectLinkRepository.findOneBy({
      user: { id: user.id },
    });
  }

  public async collectRice(user: User, riceCollectLink: RiceCollectLink): Promise<RiceCollect> {
    const riceCollect = await this.getUserRiceCollect(user) ?? this.riceCollectRepository.create({ user });
    riceCollect.nextTime = new Date(Date.now() + 1000 * 60 * 60 * 4);
    await this.riceCollectRepository.save(riceCollect);
    await this.riceCollectLinkRepository.remove(riceCollectLink);
    return riceCollect;
  }
}

export const riceService = new RiceService(
  dataSource.getRepository(RiceCollect),
  dataSource.getRepository(RiceCollectLink)
);
