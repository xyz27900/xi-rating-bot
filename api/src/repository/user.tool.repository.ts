import { dataSource } from '@/data.source';
import { UserTool } from '@/entity/user.tool.entity';

export const userToolRepository = dataSource.getRepository(UserTool);
export const USER_TOOL_REPOSITORY = Symbol('UserToolRepository');
