import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

const useQueryParam = (key: string): [unknown, (value: unknown) => void] => {
  const [params, setParams] = useSearchParams();

  const query = useMemo(() => {
    return params.get(key);
  }, [params, key]);

  const setQuery = (value: unknown) => {
    setParams(queryString.stringify({ [key]: value }));
  };

  return [query ? query : undefined, setQuery];
};
export default useQueryParam;
