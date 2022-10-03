import useApi from "./use-api";

export const useUsersByFamily = (params: { familyId: string, name: string }) => {
  const stringParams = new URLSearchParams(params);
  const users = useApi(`/api/users?${stringParams}`);
  return users;
};
