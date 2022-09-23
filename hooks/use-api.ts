import swr from 'swr';
import fetcher from 'utils/fetcher';

const useApi = (url: string) => {
  const { data, isValidating, error } = swr(url, fetcher);

  return {
    data,
    isValidating,
    error,
  };
};

export default useApi;
