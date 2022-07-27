import { createContext } from "react";

export type ContextInterface = {
  setPopup: (text: string, severity: string) => void;
};

const Context = createContext<ContextInterface>({
  setPopup: (text: string, severity: string) => {},
});

export default Context;

//Set popup is a function that accept text, and severity as a parametar. When called, it activate a snackbar on the screen which is stilized and defined in /Home/Popup/Popup.tsx. Severity could be "error", "warning", "info" or "success", and text can be any string.
