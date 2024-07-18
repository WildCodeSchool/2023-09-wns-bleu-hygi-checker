export const testPerDay = (urlCount: number, interval: number): number => {
  const countTestByhour = 60 / interval;
  const testsByHour = countTestByhour * urlCount;
  return Math.ceil(testsByHour * 24);
};
