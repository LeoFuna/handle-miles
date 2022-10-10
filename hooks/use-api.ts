import swr from 'swr';
import fetcher from 'utils/fetcher';

const useApi = (url: string) => {
  const { data, isValidating, error, mutate } = swr(url, fetcher, { revalidateOnFocus: false });

  return {
    data,
    isValidating,
    error,
    mutate,
  };
};

export default useApi;
