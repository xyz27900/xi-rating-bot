import { BalanceFunctionArgs } from '@/bot/balance/types';
import { dataSource } from '@/data.source';

export const increaseBalance = async (args: BalanceFunctionArgs): Promise<string> => {
  const { user, value } = args;

  user.balance += value;

  await dataSource.manager.save(user);

  return `Твой кошелек пополнился на *Ұ${value}* 🤑`;
};
