import { useState, createContext } from "react";

interface IDisplay {
  component: React.ReactNode,
  isOpen: boolean
}

export type ContextProps = {
  display: IDisplay,
  setDisplay: React.Dispatch<React.SetStateAction<IDisplay>>
}

const initContextProps = {
  display: {
    component: null,
    isOpen: false
  },
  setDisplay: () => {}
}

const DisplayContext = createContext<ContextProps>(initContextProps);

export const DisplayContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ display, setDisplay ] = useState<IDisplay>({
    component: null,
    isOpen: false
  });

  return (
    <DisplayContext.Provider value={{ display, setDisplay }}>
      { children }
    </DisplayContext.Provider>
  )
}

export default DisplayContext;