import { dataSource } from '@/data.source';
import { Harvest } from '@/entity/harvest.entity';

export const harvestRepository = dataSource.getRepository(Harvest);
export const HARVEST_REPOSITORY = Symbol('HarvestRepository');
