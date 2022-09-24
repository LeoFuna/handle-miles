import useApi from "./use-api";

type Companies = {
  id: string;
  name: string;
}

type CompaniesSWR = {
  data?: {
    companies: Companies[];
  };
  error?: any;
  isValidating: boolean;
}

export const useCompanies = (): CompaniesSWR => {
  const companies = useApi('/api/companies');
  return companies;
};
