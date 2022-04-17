import { marked } from 'marked';

export const renderer = new marked.Renderer();

renderer.heading = (text, level): string => {
  const textSize: Record<1 | 2 | 3| 4| 5 | 6, string> = {
    1: 'text-3xl',
    2: 'text-2xl',
    3: 'text-xl',
    4: 'text-lg',
    5: 'text-md',
    6: 'text-sm',
  };

  const marginBottom: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
    1: 'mb-4',
    2: 'mb-3',
    3: 'mb-2',
    4: 'mb-2',
    5: 'mb-1',
    6: 'mb-1',
  };

  const className = `font-bold ${textSize[level]} mt-0 ${marginBottom[level]}`;
  return `<h${level} class="${className}">${text}</h${level}>`;
};

renderer.paragraph = (text): string => {
  return `<p class="mb-4">${text}</p>`;
};

renderer.list = (body): string => {
  return `<ul class="list-disc pl-6 mb-4">${body}</ul>`;
};

renderer.hr = (): string => {
  return '<hr class="mb-4" />';
};
