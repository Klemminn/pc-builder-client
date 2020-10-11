export const thousandSeparator = (num: number | string) => {
  return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export const formatCurrency = (num: number | string) => {
  return `${thousandSeparator(num)}kr.`;
};

export const getSmallImageUrl = (url: string) => {
  const split = url.split('.');
  split[split.length - 2] += '-small';
  return split.join('.');
};

export const formatFrequency = (value: string | number) => {
  const num = Number(value);
  return num >= 1000
    ? `${(num / 1000).toString().replace('.', ',')}GHz`
    : `${num}MHz`;
};

export const formatCapacity = (value: string | number) => {
  const num = Number(value);
  return num >= 1000
    ? `${(num / 1000).toString().replace('.', ',')}TB`
    : `${num}GB`;
};
