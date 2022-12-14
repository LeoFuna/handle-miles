import { KeyedMutator } from "swr";
import fetcher from "utils/fetcher";
import useApi from "./use-api";

type CompanySettingsByFamilyParams = {
  familyId: string;
}

export type CompanySettingsFromApi = {
  id: string;
  companyId: string;
  companyName: string;
  familyId: string;
  sellAveragePrice: number;
}

type CompanySettingsSWR = {
  data?: {
    exchangeConfigs: CompanySettingsFromApi[];
  };
  error?: any;
  isValidating: boolean;
  mutate: KeyedMutator<any>;
}

export const useCompanySettingsByFamily = (params: CompanySettingsByFamilyParams): CompanySettingsSWR => {
  const url = new URLSearchParams(params);
  const settings = useApi(`/api/settings?${url}`);
  return settings;
};

type UpdateCompanySettingsPayload = {
  settingsId: string;
  sellAveragePrice: number;
}

export const useUpdateCompanySettings = (body: UpdateCompanySettingsPayload): Promise<{ id: string }> => {
  const updateResponse = fetcher('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return updateResponse;
};
