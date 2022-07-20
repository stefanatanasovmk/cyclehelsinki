import { createContext } from "react";

export type ContextInterface = {
  setPopup: (text: string, severity: string) => void;
};

const Context = createContext<ContextInterface>({
  setPopup: (text: string, severity: string) => {},
});

export default Context;
