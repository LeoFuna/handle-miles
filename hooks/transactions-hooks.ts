import useApi from 'hooks/use-api';
import fetcher from 'utils/fetcher';

type TransactionsParams = {
  userId?: string,
}

type Transaction = {
  averagePrice: number,
  company: string,
  date: string,
  id: string,
  totalMiles: number,
  type: string,
  userId: string,
  note: string,
  companyId: string,
}

type TransactionsSWR = {
  data?: {
    transactions: Transaction[],
  },
  error?: any,
  isValidating: boolean,
}

export const useTransactions = (params: TransactionsParams): TransactionsSWR => {
  const stringParams = new URLSearchParams(params);
  const transactions = useApi(`/api/transactions?${stringParams}`);
  return transactions;
};

export const useCreateTransaction = (payload: any): any => {
  return fetcher('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
