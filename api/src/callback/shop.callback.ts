import { Middleware } from 'grammy';
import { toolService, userService } from '@/core/services';
import { dataSource } from '@/data.source';
import { mention } from '@/utils/telegram';

export const shopCallback: Middleware = async (ctx) => {
  if (!ctx.callbackQuery || !ctx.callbackQuery.data) {
    return;
  }

  const { from } = ctx.callbackQuery;
  const user = await userService.getUserById(from.id);
  if (!user) {
    return;
  }

  const toolIdStr = ctx.callbackQuery.data.split(':')[1];
  const toolId = Number(toolIdStr);
  if (isNaN(toolId)) {
    return;
  }

  const tool = await toolService.getToolById(toolId);
  if (!tool) {
    return;
  }

  const userHasTool = await toolService.checkIfUserHasTool(user, tool);
  if (userHasTool) {
    const text = `Тебе это без надобности. У тебя уже есть ${tool.description}`;
    await ctx.answerCallbackQuery({ text, show_alert: true });
  } else if (user.balance < tool.price) {
    const notEnoughMoneyText = user.balance > 0
      ? `У тебя есть только Ұ${user.balance}`
      : 'У тебя нет денег 🤷‍♂️';

    const text = `${tool.description} стоит Ұ${tool.price}\n${notEnoughMoneyText}`;

    await ctx.answerCallbackQuery({ text, show_alert: true });
  } else {
    user.balance -= tool.price;

    const userTool = await toolService.createUserTool(user, tool);

    await dataSource.manager.save(userTool);
    await dataSource.manager.save(user);

    const text = [
      `${mention(user)}, *${tool.description.toLowerCase()}* - это отличная покупка! 👍`,
      'Заходи ещё, у меня всегда есть чем тебя порадовать 👋',
    ].join('\n\n');

    await ctx.reply(text, { parse_mode: 'Markdown' });
  }
};
