import { createContext } from "react";

export type ContextInterface = {
  setPopup: (text: string) => void;
};

const Context = createContext<ContextInterface>({
  setPopup: (text: string) => {},
});

export default Context;
