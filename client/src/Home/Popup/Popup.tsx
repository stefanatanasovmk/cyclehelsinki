import { Snackbar, Alert } from "@mui/material";
interface Props {
  isPopupOpen: boolean;
  setIsPopupOpen: (isPopupOpen: boolean) => void;
  text: string;
  severity: string | undefined;
}

export default function Popup({
  isPopupOpen,
  setIsPopupOpen,
  text = "Something went wrong, please try again",
  severity = "warning",
}: Props): JSX.Element {
  return (
    <Snackbar
      open={isPopupOpen}
      autoHideDuration={6000}
      onClose={() => setIsPopupOpen(false)}
    >
      <Alert
        onClose={() => setIsPopupOpen(false)}
        severity={
          severity === "success"
            ? "success"
            : severity === "error"
            ? "error"
            : severity === "info"
            ? "info"
            : "warning"
        }
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}
