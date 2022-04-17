import { User } from '@/entity/user.entity';
import { randomElement } from '@/utils/array';
import { mention } from '@/utils/telegram';

export const tipMechanics = (message: string, user: User): string => {
  const match = message.match(/(.*)\sили\s(.*[^?])/i);
  if (!match) {
    return [
      `${mention(user)}, чтобы спросить совет у партии, напиши`,
      '/tip да или нет',
    ].join('\n\n');
  }

  if (Math.random() < 0.1) {
    const phrases = [
      `${mention(user)}, партия считает твой вопрос неуместным 😑`,
      `${mention(user)}, этот вопрос оскорбляет нашего вождя 🤬`,
      `${mention(user)}, перестань беспокоить партию по пустякам 🙄`,
    ];

    return randomElement(phrases);
  }

  const [/* full */, first, second] = match;
  const items = [first, second].map(item => item.trim());

  const phrases = [
    `${mention(user)}, партия решила, что`,
    `${mention(user)}, великий вождь говорит`,
    `${mention(user)}, не нужно сомневаться, конечно же`,
  ];

  return [
    randomElement(phrases),
    `*${randomElement(items)}*`,
  ].join(' ');
};
