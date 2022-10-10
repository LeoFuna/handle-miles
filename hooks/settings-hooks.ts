import useApi from "./use-api";

type CompanySettingsByFamilyParams = {
  familyId: string;
}

export type CompanySettings = {
  id: string;
  companyId: string;
  companyName: string;
  familyId: string;
  sellAveragePrice: number;
}

type CompanySettingsSWR = {
  data?: {
    exchangeConfigs: CompanySettings[];
  };
  error?: any;
  isValidating: boolean;
}

export const useCompanySettingsByFamily = (params: CompanySettingsByFamilyParams): CompanySettingsSWR => {
  const url = new URLSearchParams(params);
  const settings = useApi(`/api/settings?${url}`);
  return settings;
};
