import useApi from 'hooks/use-api';

type TransactionsParams = {
  userId?: string,
}

export const useTransactions = (params: TransactionsParams) => {
  const stringParams = new URLSearchParams(params);
  const transactions = useApi(`/api/transactions?${stringParams}`);
  return transactions;
};

