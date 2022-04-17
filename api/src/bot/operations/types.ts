import { Context } from 'grammy';
import { User } from '@/entity/user.entity';

interface OperationFnArgs {
  ctx: Context;
  messageId: number;
  from: User;
  target: User;
}

export type OperationFn = (args: OperationFnArgs) => Promise<void>;
