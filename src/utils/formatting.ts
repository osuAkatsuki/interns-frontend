// TODO: proper localiztion
const NUMBER_FORMAT = new Intl.NumberFormat("en-us");

export const formatNumber = (n: number): string => NUMBER_FORMAT.format(Number(n.toFixed(2)));
