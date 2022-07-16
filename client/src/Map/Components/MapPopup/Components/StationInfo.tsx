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
      <div>
        <h3>Station name: {Name}</h3>
        <h3>Address: {Osoite}</h3>
      </div>
      <div>
        <h3>Capacity: {Kapasiteet}</h3>

        <h3>
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
        </h3>
      </div>
    </div>
  );
}
