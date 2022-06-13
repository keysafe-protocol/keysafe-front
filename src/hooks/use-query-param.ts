import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

const useQueryParam = <T extends any>(key: string) => {
  const [params, setParams] = useSearchParams();

  const query = useMemo(() => {
    return params.get(key);
  }, [params, key]);

  const setQuery = (value: T) => {
    setParams(queryString.stringify({ [key]: value }));
  };

  return [query ? query : undefined, setQuery] as [T, (value: T) => void];
};
export default useQueryParam;
