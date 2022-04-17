import { Context, InlineKeyboard } from 'grammy';
import { In, Not } from 'typeorm';
import { getUserHelper } from '@/bot/helpers/get.user.helper';
import { dataSource } from '@/data.source';
import { Tool } from '@/entity/tool.entity';
import { UserTool } from '@/entity/user.tool.entity';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export const shopCommand = async (ctx: Context): Promise<void> => {
  const user = await getUserHelper(ctx);
  if (!user) {
    return;
  }

  const userTools = await dataSource.manager.find(UserTool, {
    where: {
      user: { id: user.id },
    },
    relations: ['tool'],
  });

  const tools = await dataSource.manager.findBy(Tool, {
    id: Not(In(userTools.map((userTool) => userTool.tool.id))),
  });

  if (tools.length === 0) {
    const text = [
      `${mention(user)}, ты скупил все инструменты! 😱`,
      'Приходи в другой раз, может быть появится что-то новое 👋',
    ].join('\n\n');

    await ctx.reply(text, { parse_mode: 'Markdown' });

    return;
  }

  const phrases = [
    'Вот что я могу тебе предложить 😏',
    'Смотри, что у меня тут есть 👀',
    'Выбирай, не стесняйся 🙌',
  ];

  const text = [
    `${mention(user)}, спасибо, что заглянул на рынок к Цзинсуну 👲`,
    randomElement(phrases),
  ].join('\n\n');

  const keyboard = tools.reduce((acc, val, index) => {
    const result = acc.text(`${val.icon} ${val.description} • Ұ${val.price}`, `shop:${val.id}`);
    if (index % 2 === 1) {
      result.row();
    }

    return result;
  }, new InlineKeyboard());

  await ctx.reply(text, {
    reply_markup: keyboard,
    parse_mode: 'Markdown',
  });
};
