import { dataSource } from '@/data.source';
import { Tool } from '@/entity/tool.entity';
import { User } from '@/entity/user.entity';
import { UserTool } from '@/entity/user.tool.entity';
import { mention } from '@/utils/telegram';

interface ToolPurchaseReply {
  success: boolean;
  text: string;
}

export const toolPurchase = async (tool: Tool, user: User): Promise<ToolPurchaseReply> => {
  if (user.balance < tool.price) {
    return {
      success: false,
      text: [
        `${tool.description} стоит Ұ${tool.price}`,
        user.balance > 0
          ? `У тебя есть только Ұ${user.balance}`
          : 'У тебя нет денег 🤷‍♂️',
      ].join('\n'),
    };
  }

  user.balance -= tool.price;

  const userTool = dataSource.manager.create(UserTool, {
    user,
    tool,
  });

  await dataSource.manager.save(userTool);
  await dataSource.manager.save(user);

  return {
    success: true,
    text: [
      `${mention(user)}, *${tool.description.toLowerCase()}* - это отличная покупка! 👍`,
      'Заходи ещё, у меня всегда есть чем тебя порадовать 👋',
    ].join('\n\n'),
  };
};
