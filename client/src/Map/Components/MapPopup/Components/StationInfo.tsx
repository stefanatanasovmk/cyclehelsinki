import "../Style/StationInfo.css";
import greenIcon from "../../../Icons/images/green-square.png";
import redIcon from "../../../Icons/images/red-square.png";
import { Typography } from "@mui/material";

interface Props {
  Name: string;
  Osoite: string;
  Kapasiteet: string;
  bikesAvailable: string;
}

const style = { marginBottom: "2vh", fontWeight: "bold" };

export default function StationInfo({
  Name,
  Osoite,
  Kapasiteet,
  bikesAvailable,
}: Props): JSX.Element {
  return (
    <div className="StationInfoDiv">
      <div>
        <Typography variant="subtitle2" style={style}>
          Station name: {Name}
        </Typography>
        <Typography variant="subtitle2" style={style}>
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
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle2" style={style}>
          Address: {Osoite}
        </Typography>
        <Typography variant="subtitle2" style={style}>
          Capacity: {Kapasiteet}
        </Typography>
      </div>
    </div>
  );
}
