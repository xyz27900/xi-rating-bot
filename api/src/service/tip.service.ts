import { randomElement } from '@/utils/array';

export class TipService {
  private static extractData(string: string): [string, string] | null {
    const match = string.match(/(.*)\sили\s(.*[^?])/i);
    if (match) {
      const [/* full */, first, second] = match;
      return [first, second].map(item => item.trim()) as [string, string];
    } else {
      return null;
    }
  }

  public process(data: string): string {
    const items = TipService.extractData(data);
    if (!items) {
      return 'чтобы спросить совет у партии, напиши\n\n```\/tip да или нет```';
    }

    if (Math.random() < 0.1) {
      const phrases = [
        'партия считает твой вопрос неуместным 😑',
        'этот вопрос оскорбляет нашего вождя 🤬',
        'перестань беспокоить партию по пустякам 🙄',
      ];

      return randomElement(phrases);
    } else {
      const phrases = [
        'партия решила, что',
        'великий вождь говорит',
        'не нужно сомневаться, конечно же',
      ];

      return `${randomElement(phrases)} ${randomElement(items)}`;
    }
  }
}

export const tipService = new TipService();
