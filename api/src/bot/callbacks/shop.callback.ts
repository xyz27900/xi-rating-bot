import { Context } from 'grammy';
import { toolPurchase } from '@/bot/purchase/tool.purchase';
import { dataSource } from '@/data.source';
import { Tool } from '@/entity/tool.entity';
import { User } from '@/entity/user.entity';
import { UserTool } from '@/entity/user.tool.entity';

export const shopCallback = async (ctx: Context): Promise<void> => {
  if (!ctx.callbackQuery || !ctx.callbackQuery.data) {
    return;
  }

  const { from } = ctx.callbackQuery;
  const user = await dataSource.manager.findOneBy(User, { id: from.id });
  if (!user) {
    return;
  }

  const toolIdStr = ctx.callbackQuery.data.split(':')[1];
  const toolId = Number(toolIdStr);
  if (isNaN(toolId)) {
    return;
  }

  const tool = await dataSource.manager.findOneBy(Tool, { id: toolId });
  if (!tool) {
    return;
  }

  const userTool = await dataSource.manager.findOne(UserTool, {
    where: {
      user: { id: user.id },
      tool,
    },
    relations: ['tool'],
  });

  if (userTool) {
    const text = `Тебе это без надобности. У тебя уже есть ${tool.description}`;

    await ctx.answerCallbackQuery({
      text,
      show_alert: true,
    });

    return;
  }

  const { text, success } = await toolPurchase(tool, user);
  if (success) {
    await ctx.reply(text, { parse_mode: 'Markdown' });
  } else {
    await ctx.answerCallbackQuery({
      text,
      show_alert: true,
    });
  }
};
