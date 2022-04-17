import { User } from '@/entity/user.entity';

export interface RatingFunctionArgs {
  user: User;
  value: number;
  reason: string;
}
