import { Modal, Typography, Button } from "@mui/material";
import "../Style/ErrorModal.css";
interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  text: string;
}

export default function ErrorModal({
  isModalOpen,
  setIsModalOpen,
  text = "Something went wrong, please try again",
}: Props): JSX.Element {
  return (
    <Modal open={isModalOpen}>
      <div className="ErrorModal">
        <Typography variant="button">{text}</Typography>
        <Button
          style={{ marginTop: "1vh", width: "50%" }}
          variant="contained"
          color="error"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
