import { useEffect } from "react";
import { useMap } from "react-leaflet";
import Station from "../Utils/Interfaces/station.interface";
import StationMarker from "./StationMarker";
interface Props{

     station:Station[]
}

export default function SearchedStation({ station }: Props): JSX.Element{
     const map = useMap()

     useEffect(() => {
          map.setView([station[0].Location.coordinates[1], station[0].Location.coordinates[0]], 16)
     }, [station, map])
     return (
          <StationMarker
               id={station[0]._id}
               Name={station[0].Name}
               Osoite={station[0].Osoite}
               Kapasiteet={station[0].Kapasiteet}
               coordinates={[station[0].Location.coordinates[1], station[0].Location.coordinates[0]]}
          />
     )
}

