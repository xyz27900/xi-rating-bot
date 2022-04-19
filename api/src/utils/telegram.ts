import { User } from '@/entity/user.entity';

export const mention = (user: User): string => {
  return `[${user.name}](tg://user?id=${user.id})`;
};
