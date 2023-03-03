export const useParsedNumber = (num: number) => {
  const units = num % 10;
  const dozens = Math.floor((num % 100) / 10);
  const hundreds = Math.floor((num % 1000) / 100);

  return { units, dozens, hundreds };
};
