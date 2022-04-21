import { dataSource } from '@/data.source';
import { HarvestLink } from '@/entity/harvest.link.entity';

export const harvestLinkRepository = dataSource.getRepository(HarvestLink);
export const HARVEST_LINK_REPOSITORY = Symbol('HarvestLinkRepository');
