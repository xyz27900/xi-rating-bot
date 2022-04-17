export const randomElement = <T> (array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
