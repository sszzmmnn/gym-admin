import { useState, createContext } from "react";
import { IApiPath } from "../types/types";

export type ContextProps = {
  apiPath: IApiPath,
  setApiPath: React.Dispatch<React.SetStateAction<IApiPath>>
}

const initContextProps = {
  apiPath: {} as IApiPath,
  setApiPath: () => {}
}

const ApiPathContext = createContext<ContextProps>(initContextProps);

export const ApiPathContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ apiPath, setApiPath ] = useState<IApiPath>({
    path: '',
    page: 0
  });

  return (
    <ApiPathContext.Provider value={{ apiPath, setApiPath }}>
      { children }
    </ApiPathContext.Provider>
  )
}

export default ApiPathContext;