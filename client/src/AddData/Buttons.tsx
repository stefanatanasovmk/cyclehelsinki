import { Button, DialogActions } from "@mui/material";

interface Props {
  handleSave: () => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function Buttons({
  handleSave,
  setIsModalOpen,
}: Props): JSX.Element {
  return (
    <DialogActions>
      <Button
        fullWidth
        variant="contained"
        color="warning"
        onClick={() => setIsModalOpen(false)}
      >
        Close
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="success"
        onClick={handleSave}
      >
        Save
      </Button>
    </DialogActions>
  );
}
