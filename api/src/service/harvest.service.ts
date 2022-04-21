import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { Harvest } from '@/entity/harvest.entity';
import { HarvestLink } from '@/entity/harvest.link.entity';
import { User } from '@/entity/user.entity';
import { HARVEST_LINK_REPOSITORY } from '@/repository/harvest.link.repository';
import { HARVEST_REPOSITORY } from '@/repository/harvest.repository';
import { randomSubjects } from '@/utils/subject';

@injectable()
export class HarvestService {
  private readonly harvestRepository: Repository<Harvest>;
  private readonly harvestLinkRepository: Repository<HarvestLink>;

  constructor(
    @inject(HARVEST_REPOSITORY) harvestRepository: Repository<Harvest>,
    @inject(HARVEST_LINK_REPOSITORY) harvestLinkRepository: Repository<HarvestLink>
  ) {
    this.harvestRepository = harvestRepository;
    this.harvestLinkRepository = harvestLinkRepository;
  }

  public async getUserHarvest(user: User): Promise<Harvest | null> {
    return await this.harvestRepository.findOneBy({
      user: { id: user.id },
    });
  }

  public async updateUserHarvest(user: User): Promise<Harvest> {
    const harvest = await this.getUserHarvest(user) ?? this.harvestRepository.create({ user });
    harvest.nextTime = new Date(Date.now() + 1000 * 60 * 60 * 4);
    return harvest;
  }

  public async getUserHarvestLink(user: User): Promise<HarvestLink | null> {
    return await this.harvestLinkRepository.findOneBy({
      user: { id: user.id },
    });
  }

  public async createUserHarvestLink(id: string, user: User, chatId: number, messageId: number): Promise<HarvestLink> {
    return this.harvestLinkRepository.create({
      id,
      user,
      chatId,
      messageId,
      subjects: ['empty', ...randomSubjects(35)],
    });
  }
}
