// generatePremiumCode.ts
const generatePremiumCode = (): string => {
  const length = 16;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

const formatCode = (code: string): string => {
  // Split the code into chunks of 4 characters
  const chunks = code.match(/.{1,4}/g);
  if (chunks) {
    return chunks.join("-");
  }
  return code;
};

export const generateFormattedPremiumCode = (): string => {
  const rawCode = generatePremiumCode(); // Generate a 16-character long code
  return formatCode(rawCode);
};
