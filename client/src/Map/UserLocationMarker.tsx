import { Marker,useMap } from 'react-leaflet';
import { userIcon } from './Icons/StationIcon.config';

interface Props{
     coordinates: [number, number]
}

export default function UserLocationMarker({ coordinates }: Props): JSX.Element{
     const map=useMap()
     return (
          <Marker icon={userIcon}
               position={coordinates}
               eventHandlers={{ click: () => { map.setView(coordinates, 16) } }} />
         
     )
}