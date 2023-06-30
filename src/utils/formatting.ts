// TODO: proper localiztion
const NUMBER_FORMAT = new Intl.NumberFormat("en-us");

export const formatNumber = (n: number): string => NUMBER_FORMAT.format(Number(n.toFixed(2)));

enum TimeUnits {
  Seconds = 1,
  Minutes = 60 * Seconds,
  Hours = 60 * Minutes,
  Days = 24 * Hours,
  Years = 365 * Days,
  Centuries = 100 * Years,
}

export const formatTimespan = (seconds: number): string => {
  const centuries = Math.floor(seconds / TimeUnits.Centuries);
  seconds %= TimeUnits.Centuries;
  const years = Math.floor(seconds / TimeUnits.Years);
  seconds %= TimeUnits.Years;
  const days = Math.floor(seconds / TimeUnits.Days);
  seconds %= TimeUnits.Days;
  const hours = Math.floor(seconds / TimeUnits.Hours);
  seconds %= TimeUnits.Hours;
  const minutes = Math.floor(seconds / TimeUnits.Minutes);
  seconds %= TimeUnits.Minutes;

  const parts = [];
  if (centuries > 0) parts.push(`${centuries}c`);
  if (years > 0) parts.push(`${years}y`);
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.join(" ");
};
