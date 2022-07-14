import secondsToTime from "../../Utils/Functions/secondsToTime";
import { Modal, Typography, Button } from "@mui/material";
import "./Style/TripModal.css";
interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  departureTime: string;
  returnTime: string;
  departureStation: string;
  arrivalStation: string;
  CoveredDistance: number;
  Duration: number;
}

export default function TripModal({
  isModalOpen,
  setIsModalOpen,
  departureTime,
  returnTime,
  departureStation,
  arrivalStation,
  CoveredDistance,
  Duration,
}: Props): JSX.Element {
  return (
    <Modal open={isModalOpen}>
      <div className="TripModalBox">
        <Typography variant="subtitle2">Departured: {departureTime}</Typography>
        <Typography variant="subtitle2">Returned: {returnTime}</Typography>
        <Typography variant="subtitle2">
          Departure station: {departureStation}
        </Typography>
        <Typography variant="subtitle2">
          Return station: {arrivalStation}
        </Typography>
        <Typography variant="subtitle2">
          Covered distance: {CoveredDistance} m.
        </Typography>
        <Typography variant="subtitle2">
          Duration: {secondsToTime(Duration)}
        </Typography>
        <Button
          style={{ marginTop: "1vh" }}
          fullWidth
          variant="contained"
          color="info"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
