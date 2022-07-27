import Control from "react-leaflet-custom-control";
import userLocationIcon from "./Icons/images/user-location.png";
import { useMap } from "react-leaflet";

interface Props {
  position: L.ControlPosition;
  setDoesUserHaveLocation: (doesUserHaveLocation: boolean) => void;
  setPopup: (popup: string, type: string) => void;
  setLongLat: (longLat: [number, number]) => void;
}

export default function FindUserLocationBtn({
  setDoesUserHaveLocation,
  position,
  setPopup,
  setLongLat,
}: Props): JSX.Element {
  const map = useMap();

  //Handle for when user ask to be located. It will zoom on the user location on the map.
  const onClickHandler = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongLat([position.coords.latitude, position.coords.longitude]);
          setDoesUserHaveLocation(true);
          map.closePopup();
          map.setView(
            [position.coords.latitude, position.coords.longitude],
            16
          );
        },
        () => {
          setPopup("You need to allow us to use your location", "warning");
        }
      );
    } else {
      setPopup("Your browser does not support geolocation", "warning");
    }
  };

  return (
    <Control position={position}>
      <img
        className="FindUserIcon"
        src={userLocationIcon}
        width="30px"
        height="30px"
        alt="Find user location"
        onClick={onClickHandler}
      />
    </Control>
  );
}
