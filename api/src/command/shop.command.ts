import { InlineKeyboard, Middleware } from 'grammy';
import { toolService } from '@/service/tool.service';
import { AuthBotContext } from '@/types/bot';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export const shopCommand: Middleware = async (ctx) => {
  const { user } = ctx as AuthBotContext;

  const tools = await toolService.getUserPurchasableTools(user);

  if (tools.length === 0) {
    const text = [
      `${mention(user)}, ты скупил все инструменты! 😱`,
      'Приходи в другой раз, может быть появится что-то новое 👋',
    ].join('\n\n');

    await ctx.reply(text, { parse_mode: 'Markdown' });
  } else {
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
  }
};
