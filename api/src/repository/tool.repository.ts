import { dataSource } from '@/data.source';
import { Tool } from '@/entity/tool.entity';

export const toolRepository = dataSource.getRepository(Tool);
export const TOOL_REPOSITORY = Symbol('ToolRepository');
