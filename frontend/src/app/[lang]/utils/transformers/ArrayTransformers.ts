/**
 * Split `items` into `n` chunks
 *
 * @example groupArray([1,2,3,4,5], 2, true)
 * returns [[1,3,5],[2,4]]
 *
 * @param items - Array of any type
 * @param n - Number of groups to be split into
 * @returns `items` into `n` groups
 */
export const splitToNChunks = (items: any[], n: number) => {
  const array = items.slice();
  const result = [];
  while (array.length) {
    result.push(array.splice(0, Math.ceil(array.length / n--)));
  }
  return result;
};
