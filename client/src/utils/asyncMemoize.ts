export const asyncMemoize = (
  func: Function,
): (<T, A>(...args: Array<A>) => Promise<T>) => {
  const cache = new Map();

  return async <T, A>(...args: Array<A>): Promise<T> => {
    const key = Object.values(args).join("");

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = await func(...args);

    cache.set(key, result);

    return result;
  };
};
