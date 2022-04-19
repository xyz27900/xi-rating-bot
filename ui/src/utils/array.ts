export const randomElement = <T> (array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const splitByChunks = <T> (array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
};

export const arrayIncludes = <T> (array: T[], element: any): element is T => {
  return array.includes(element);
};
