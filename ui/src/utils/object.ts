export const objectKeys = <T> (object: T): (keyof T)[] => {
  return Object.keys(object) as (keyof T)[];
};

export const objectValues = <T> (object: T): (T[keyof T])[] => {
  return Object.values(object) as (T[keyof T])[];
};
