import { createContext } from "react";

export type ContextInterface = {
  setError: (text: string) => void;
}

const Context = createContext<ContextInterface>({
  setError: (text: string) => {},
});

export default Context;
