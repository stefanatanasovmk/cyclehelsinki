import { useState } from "react";
import { Modal, Button, TextField } from "@mui/material";
import "./Style/Modal.css";
import AddressSearch from "./AddressSearch";

interface Props {
  setIsAddStationModalOpen: (isErrorModalOpen: boolean) => void;
  isAddStationModalOpen: boolean;
}

export default function AddStation({
  setIsAddStationModalOpen,
  isAddStationModalOpen,
}: Props): JSX.Element {
  const [selectedAddress, setSelectedAddress] = useState<object | undefined>(
    undefined
  );

  return (
    <Modal open={isAddStationModalOpen}>
      <div className="Modal">
        <TextField fullWidth label="Station name" variant="outlined" />
        <AddressSearch
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
        />
        <TextField fullWidth label="Operator" variant="outlined" />
        <TextField fullWidth label="Capacity" variant="outlined" />
        <Button
          style={{ marginTop: "1vh" }}
          fullWidth
          variant="contained"
          color="success"
          onClick={() => console.log("add station")}
        >
          Save
        </Button>
        <Button
          style={{ marginTop: "1vh" }}
          fullWidth
          variant="contained"
          color="warning"
          onClick={() => setIsAddStationModalOpen(false)}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
