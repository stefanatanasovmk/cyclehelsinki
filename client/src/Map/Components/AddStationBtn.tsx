import Control from "react-leaflet-custom-control";
import addLocation from "../Icons/images/add-location.png";
interface Props {
  setIsAddStationModalOpen: (isErrorModalOpen: boolean) => void;
}
export default function AddStationBtn({
  setIsAddStationModalOpen,
}: Props): JSX.Element {
  return (
    <Control position="topleft">
      <img
        className="FindUserIcon"
        src={addLocation}
        width="30px"
        height="30px"
        alt="Find user location"
        onClick={(e) => {
          e.stopPropagation();
          setIsAddStationModalOpen(true);
        }}
      />
    </Control>
  );
}
