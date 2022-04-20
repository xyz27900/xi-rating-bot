import { dataSource } from '@/data.source';
import { RiceCollect } from '@/entity/rice.collect.entity';

export const harvestRepository = dataSource.getRepository(RiceCollect);
export const HARVEST_REPOSITORY = Symbol('HarvestRepository');
