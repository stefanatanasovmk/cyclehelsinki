import { Button, TextField, CircularProgress } from "@mui/material";
import "./Style/FilterByTime.css";
import SearchIcon from "@mui/icons-material/Search";
import RadioButtons from "./RadioButtons";

interface Props {
  from: string;
  until: string;
  setFrom: (value: string) => void;
  setUntil: (value: string) => void;
  filterBy: string;
  setFilterBy: (value: string) => void;
  getTripsHandler: () => void;
  isLoading: boolean;
}

const textfieldStyle = { marginTop: "1vh" };

export default function FilterByTime({
  from,
  until,
  setFrom,
  setUntil,
  filterBy,
  setFilterBy,
  getTripsHandler,
  isLoading,
}: Props): JSX.Element {
  return (
    <>
      <RadioButtons filterBy={filterBy} setFilterBy={setFilterBy} />
      <div className="FilterByTime">
        <TextField
          style={textfieldStyle}
          fullWidth
          variant="outlined"
          color="primary"
          label="From"
          type="datetime-local"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <TextField
          style={textfieldStyle}
          fullWidth
          variant="outlined"
          color="primary"
          label="Until "
          type="datetime-local"
          value={until}
          onChange={(e) => setUntil(e.target.value)}
        />
      </div>
      <Button
        variant="outlined"
        fullWidth
        style={{ height: "40px" }}
        onClick={getTripsHandler}
      >
        {isLoading ? (
          <CircularProgress style={{ width: "20px", height: "20px" }} />
        ) : (
          <SearchIcon />
        )}
      </Button>
    </>
  );
}
