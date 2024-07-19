export const FormatHoursAndMinutes = (date: Date): string => {
  const formatedDate = new Date(date);
  const hoursAndMinutes = formatedDate.toISOString().slice(11, 16);
  return hoursAndMinutes;
};
