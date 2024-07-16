export const testPerDay = (count: number, interval: number): number => {
  const countTestByhour = 60 / interval;
  const testsByHour = countTestByhour * count;
  return Math.ceil(testsByHour * 24);
};
