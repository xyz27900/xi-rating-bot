import { Middleware } from 'grammy';
import { SELF_DECREASE_IMAGE_URL, SELF_INCREASE_IMAGE_URL } from '@/config';
import { giftService, messageRatingService, userService } from '@/core/services';
import { dataSource } from '@/data.source';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export const messageHandler: Middleware = async (ctx) => {
  const { from, message } = ctx;
  if (!message || !from) {
    return;
  }

  const { reply_to_message: replyMessage } = message;
  if (!replyMessage || !message.text) {
    return;
  }

  const messageText = message.text.trim();
  const { from: to } = replyMessage;
  if (!to) {
    return;
  }

  const userFrom = await userService.getUserById(from.id);
  const userTo = await userService.getUserById(to.id);

  if (!userFrom || !userTo) {
    return;
  }

  const isMessageRated = await messageRatingService.checkIfAlreadyRated(userFrom, replyMessage.message_id);
  if (isMessageRated) {
    const text = [
      `${mention(userFrom)}, ты уже оценил это сообщение!`,
      'Великого вождя не обманешь! 😠',
    ].join('\n\n');

    await ctx.reply(text, {
      reply_to_message_id: replyMessage.message_id,
      parse_mode: 'Markdown',
    });

    return;
  }

  if (messageText !== '+' && messageText !== '-') {
    return;
  }

  if (userFrom.id === userTo.id) {
    const increasePhrases = [
      'Ты думал, что ты умнее вождя? 🤨',
      'У тебя не получится обмануть партию 👊',
      'Злой хитрый Иван, у тебя ничего не получится 👎',
    ];

    const decreasePhrases = [
      'Во еблан 🤣',
      'Простой рабочий Иван, ты дурак 🤡',
      'Ты совершил ошибку, но партия прощает тебе это 😇',
    ];

    const phrases = messageText === '+' ? increasePhrases : decreasePhrases;
    const imageUrl = messageText === '+' ? SELF_INCREASE_IMAGE_URL : SELF_DECREASE_IMAGE_URL;

    await ctx.replyWithPhoto(imageUrl, {
      reply_to_message_id: replyMessage.message_id,
      caption: randomElement(phrases),
    });

    return;
  }

  let text: string;

  if (messageText === '+') {
    userTo.rating += 150;

    const gifts = await giftService.getGiftsToGive(userTo);
    const userGifts = await giftService.createUserGifts(userTo, gifts);
    await dataSource.manager.save(userGifts);

    const phrases = [
      'Великий вождь Xi доволен тобой 😁',
      'Слава нашему великому вождю! 🤗',
      'Партия гордится тобой! 😎',
    ];

    const congratulatoryText = gifts.length > 0
      ? `*Ты получаешь от партии 🎉*\n${gifts.map(gift => `• ${gift.name}`).join('\n')}`
      : randomElement(phrases);

    text = `${mention(userTo)}, *+150* баллов социального рейтинга 👍\n\n${congratulatoryText}`;
  } else if (userTo.rating > 0) {
    userTo.rating = Math.max(0, userTo.rating - 150);

    const gifts = await giftService.getGiftsToTake(userTo);
    await dataSource.manager.remove(gifts);

    const phrases = [
      'Великий вождь Xi недоволен тобой 😤',
      'Ты расстраиваешь нашего великого вождя ☹️',
      'Сейчас же прекрати позорить партию! 😡',
    ];

    const accusatoryText = gifts.length > 0
      ? `*Партия отбирает у тебя 😧*\n${gifts.map(gift => `• ${gift.gift.name}`).join('\n')}`
      : randomElement(phrases);

    text = `${mention(userTo)}, *-150* баллов социального рейтинга 👎\n\n${accusatoryText}`;
  } else {
    text = `${mention(userTo)} уже на дне нашего общества 📉\n\nЕго рейтинг равен нулю 😂`;
  }

  const messageRating = messageRatingService.createMessageRating(userFrom, replyMessage.message_id);
  await dataSource.manager.save(messageRating);
  await dataSource.manager.save(userTo);

  await ctx.reply(text, { parse_mode: 'Markdown' });
};
