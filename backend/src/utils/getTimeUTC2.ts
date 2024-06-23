export default function getDateInUTCPlus2() {
  // Creates a new date with the current time in UTC
  const now = new Date();

  // Calculate the offset in minutes for UTC+2
  const offsetInMinutes = 2 * 60;

  // Apply the offset to obtain the time in UTC+2
  const utcPlus2Date = new Date(now.getTime() + offsetInMinutes * 60 * 1000);

  return utcPlus2Date;
}
