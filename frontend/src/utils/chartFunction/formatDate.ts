export const formatDate = (date: Date | string): string => {
  const formatedDate = new Date(date);
  const year = formatedDate.getFullYear();
  const month = (formatedDate.getMonth() + 1).toString().padStart(2, "0"); // Les mois sont indexés à partir de 0
  const day = formatedDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
