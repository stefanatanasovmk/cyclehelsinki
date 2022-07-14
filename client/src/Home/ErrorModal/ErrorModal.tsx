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
  text,
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

// <Modal open={isModalOpen}>
//   <div className="TripModalBox">
//     <Typography variant="subtitle2">Departured: {departureTime}</Typography>
//     <Typography variant="subtitle2">Returned: {returnTime}</Typography>
//     <Typography variant="subtitle2">
//       Departure station: {departureStation}
//     </Typography>
//     <Typography variant="subtitle2">
//       Return station: {arrivalStation}
//     </Typography>
//     <Typography variant="subtitle2">
//       Covered distance: {CoveredDistance} m.
//     </Typography>
//     <Typography variant="subtitle2">
//       Duration: {secondsToTime(Duration)}
//     </Typography>
//     <Button
//       style={{ marginTop: "1vh" }}
//       fullWidth
//       variant="contained"
//       color="info"
//       onClick={() => setIsModalOpen(false)}
//     >
//       Close
//     </Button>
//   </div>
// </Modal>;
