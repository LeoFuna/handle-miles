import useApi from "./use-api";

type UserAccountsParamsType = {
  userId?: string;
}

export type Account = {
  averagePrice: number;
  companyId: string;
  totalMiles: number;
  userId: string;
  id: string;
  company: string;
}

export type UserAccountsSWR = {
  data?: {
    accounts: Account[];
  };
  error?: any;
  isValidating: boolean;
}

type UserAccountType = (params: UserAccountsParamsType) => UserAccountsSWR

export const useUserAccounts: UserAccountType = (params: UserAccountsParamsType): UserAccountsSWR => {
  const stringParams = new URLSearchParams(params);
  const accounts = useApi(`/api/accounts?${stringParams}`);
  return accounts;
};