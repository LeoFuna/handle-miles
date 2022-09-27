import useApi from "./use-api";

type UserAccountsParamsType = {
  userId?: string;
}

type Account = {
  averagePrice: number;
  companyId: string;
  totalMiles: number;
  userId: string;
  id: string;
}

type UserAccountsSWR = {
  data?: {
    accounts: Account[];
  };
  error?: any;
  isValidating: boolean;
}

export const useUserAccounts = (params: UserAccountsParamsType): UserAccountsSWR => {
  const stringParams = new URLSearchParams(params);
  const accounts = useApi(`/api/accounts?${stringParams}`);
  return accounts;
};