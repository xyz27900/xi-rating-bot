import { dataSource } from '@/data.source';
import { User } from '@/entity/user.entity';

export const userRepository = dataSource.getRepository(User);
export const USER_REPOSITORY = Symbol('UserRepository');
