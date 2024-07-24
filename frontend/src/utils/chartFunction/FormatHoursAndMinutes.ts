export const FormatHoursAndMinutes = (date: Date): string => {
  const formatedDate = new Date(date);
  formatedDate.setHours(formatedDate.getHours() + 2);
  const hoursAndMinutes = formatedDate.toISOString().slice(11, 16);
  return hoursAndMinutes;
};
