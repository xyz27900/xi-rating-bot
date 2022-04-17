import { User } from '@/entity/user.entity';

export const mention = (user: User): string => {
  const name = user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName;
  return `[${name}](tg://user?id=${user.id})`;
};
