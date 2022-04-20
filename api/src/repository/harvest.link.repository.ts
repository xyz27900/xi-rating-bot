import { dataSource } from '@/data.source';
import { RiceCollectLink } from '@/entity/rice.collect.link.entity';

export const harvestLinkRepository = dataSource.getRepository(RiceCollectLink);
export const HARVEST_LINK_REPOSITORY = Symbol('HarvestLinkRepository');
