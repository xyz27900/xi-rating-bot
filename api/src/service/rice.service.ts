import { Repository } from 'typeorm';
import { dataSource } from '@/data.source';
import { RiceCollect } from '@/entity/rice.collect.entity';
import { RiceCollectLink } from '@/entity/rice.collect.link.entity';
import { User } from '@/entity/user.entity';
import { randomSubjects } from '@/utils/subject';

export class RiceService {
  private readonly harvestRepository: Repository<RiceCollect>;
  private readonly harvestLinkRepository: Repository<RiceCollectLink>;

  constructor(
    harvestRepository: Repository<RiceCollect>,
    harvestLinkRepository: Repository<RiceCollectLink>
  ) {
    this.harvestRepository = harvestRepository;
    this.harvestLinkRepository = harvestLinkRepository;
  }

  public async getUserHarvest(user: User): Promise<RiceCollect | null> {
    return await this.harvestRepository.findOneBy({
      user: { id: user.id },
    });
  }

  public async updateUserHarvest(user: User): Promise<RiceCollect> {
    const harvest = await this.getUserHarvest(user) ?? this.harvestRepository.create({ user });
    harvest.nextTime = new Date(Date.now() + 1000 * 60 * 60 * 4);
    return harvest;
  }

  public async getUserHarvestLink(user: User): Promise<RiceCollectLink | null> {
    return await this.harvestLinkRepository.findOneBy({
      user: { id: user.id },
    });
  }

  public async createUserHarvestLink(id: string, user: User, chatId: number, messageId: number): Promise<RiceCollectLink> {
    return this.harvestLinkRepository.create({
      id,
      user,
      chatId,
      messageId,
      subjects: ['empty', ...randomSubjects(35)],
    });
  }
}

export const riceService = new RiceService(
  dataSource.getRepository(RiceCollect),
  dataSource.getRepository(RiceCollectLink)
);
