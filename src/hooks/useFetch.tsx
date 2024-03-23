import { useState, useEffect } from "react";
import useApiPath from "./useApiPath"
import { axiosIntercept } from "../api/axios";
import { AxiosError } from "axios";
import { IResponse } from "../types/types";

const useFetch = () => {
  const { apiPath } = useApiPath();
  const [fetch, setFetch] = useState<IResponse>({
    headers: [],
    data: []
  });
  const [error, setError] = useState<string>('');
  const [docCount, setDocCount] = useState<number>(0);

  useEffect(() => {
    if(!apiPath.path) return;

    setError('');
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      await axiosIntercept.get(`/admin/${apiPath.path}`, {
        signal,
        params: {
          page: apiPath.page
        }
      }).then(res => {
        if(!signal.aborted) {
          setDocCount(prev => {
            if(apiPath.page === 0) {
              const lastElement = res.data.data.pop() as { documentCount: number };
              return lastElement.documentCount;
            };
            return prev;
          })
          setFetch(res.data)
        }
      }).catch(e => {
        if(!signal.aborted) {
          if(e instanceof AxiosError) {
            setError(e.response?.data?.error || 'Potential server error?');
          } else setError(e.toString());
        }
      })
    })();

    return () => {
      controller.abort();
    }
  }, [apiPath])

  return {fetch, docCount, error, setError};
}

export default useFetch