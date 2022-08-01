import Control from "react-leaflet-custom-control";
import closeIcon from "./Icons/images/close-icon.png";

interface Props {
  setDidUserAskedDirections: (didUserAskedDirections: boolean) => void;
  setDoesUserHaveLocation: (doesUserHaveLocation: boolean) => void;
  setIsSearched: (isSearched: boolean) => void;
}

export default function CloseBtn({
  setDidUserAskedDirections,
  setDoesUserHaveLocation,
  setIsSearched,
}: Props): JSX.Element {
  return (
    <Control
      position="topright"
      style={{
        border: "0px",
        filter: "drop-shadow(2px 5px 2px #0202026c)",
      }}
    >
      <img
        className="CloseIcon"
        src={closeIcon}
        width="30px"
        height="30px"
        alt="Find user location"
        onClick={(e) => {
          e.stopPropagation();
          setDoesUserHaveLocation(false);
          setDidUserAskedDirections(false);
          setIsSearched(false);
        }}
      />
    </Control>
  );
}
