export const formatPriceToPtBRCurrency = ({ value }: { value: number }) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return formatter.format(value).toString();
};

export const separateNumberWithDots = ({value}: { value: number }) => value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');