import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

const useQueryParams = <T>(): [T, (query: T) => void] => {
  const [params, setParams] = useSearchParams();

  const query = useMemo(() => {
    const value: Record<string, any> = {};
    params.forEach((v, k) => {
      value[k] = v;
    });
    return value;
  }, [params]);

  const setQuery = (query: T) => {
    setParams(queryString.stringify(query));
  };

  return [query as T, setQuery];
};
export default useQueryParams;
