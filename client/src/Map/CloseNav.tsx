import { Button } from "@mui/material";
import Control from "react-leaflet-custom-control";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface Props {
  setDidUserAskedDirections: (didUserAskedDirections: boolean) => void;
  setDoesUserHaveLocation: (doesUserHaveLocation: boolean) => void;
  setIsSearched: (isSearched: boolean) => void;
}

export default function CloseNav({
  setDidUserAskedDirections,
  setDoesUserHaveLocation,
  setIsSearched,
}: Props): JSX.Element {
  return (
    <Control position="topright">
      <Button
        color="warning"
        variant="contained"
        onClick={(e) => {
          e.stopPropagation();
          setDoesUserHaveLocation(false);
          setDidUserAskedDirections(false);
          setIsSearched(false);
        }}
      >
        <HighlightOffIcon />
      </Button>
    </Control>
  );
}
