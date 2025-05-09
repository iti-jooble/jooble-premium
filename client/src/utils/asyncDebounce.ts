export const asyncDebounce = <T, A>(
  func: (...arg: Array<A>) => Promise<T>,
  wait: number,
): ((...arg: Array<A>) => Promise<T>) => {
  let timeout: number | undefined;
  let prevPromiseReject: () => void | undefined;

  return (...args): Promise<T> =>
    new Promise((res, rej) => {
      if (timeout) {
        clearTimeout(timeout);

        prevPromiseReject();
      }

      prevPromiseReject = rej;

      timeout = window.setTimeout(() => {
        func(...args)
          .then(res)
          .catch(rej);
      }, wait);
    });
};
