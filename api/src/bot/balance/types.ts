import { User } from '@/entity/user.entity';

export interface BalanceFunctionArgs {
  user: User;
  value: number;
}
