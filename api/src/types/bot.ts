import { Context } from 'grammy';
import { User } from '@/entity/user.entity';

export type AuthBotContext = Context & {
  user: User;
}
