import "../Style/StationInfo.css";
import greenIcon from "../../../Icons/images/green-square.png";
import redIcon from "../../../Icons/images/red-square.png";

interface Props {
  Name: string;
  Osoite: string;
  Kapasiteet: string;
  bikesAvailable: string;
}
export default function StationInfo({
  Name,
  Osoite,
  Kapasiteet,
  bikesAvailable,
}: Props): JSX.Element {
  return (
    <div className="StationInfoDiv">
      <h5>Station name: {Name}</h5>
      <h5>Address: {Osoite}</h5>
      <h5>Capacity: {Kapasiteet}</h5>

      <h5>
        Available bikes: {bikesAvailable}
        {+bikesAvailable > 0 ? (
          <img
            src={greenIcon}
            width="15px"
            height="15px"
            alt="There is available bikes on this station"
          />
        ) : (
          <img
            width="15px"
            height="15px"
            src={redIcon}
            alt="There is no available bikes on this station"
          />
        )}
      </h5>
    </div>
  );
}
