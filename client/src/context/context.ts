import { createContext } from "react";

interface ContextInterface {
  setError: (text: string) => void;
}

const AppContext = createContext<ContextInterface | null>(null);

export default AppContext;
