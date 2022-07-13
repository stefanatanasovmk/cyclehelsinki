import  { useEffect, useState } from 'react'
import { Marker ,useMap} from 'react-leaflet'
import getAvailableBikes from '../../Utils/Functions/getAvailableBikes'
import PopUp from './PopUp'
import {StationIcon} from ".././Icons/StationIcon.config"

interface Props {
     id:string
     Name: string
     Osoite: string
     Kapasiteet: string
     coordinates: [number, number]

}

export default function StationMarker({ id, Name, Osoite, Kapasiteet, coordinates }: Props): JSX.Element{
     const map = useMap()
     const [availableBikes, setAvailableBikes] = useState<string>("0")
       useEffect(() => { 
          const getBikesAvailable = async () => {
               const data = await getAvailableBikes(id)
               if (data !== null){
                    setAvailableBikes(data?.data?.bikeRentalStation?.bikesAvailable)
                    }
          }
          getBikesAvailable()
       }, [id])
     return (
          <Marker
               icon={StationIcon(+availableBikes > 0 ? true : false)}
               position={coordinates}
               eventHandlers={{click:() => {map.setView(coordinates,16)}}}>
               <PopUp Name={Name} Osoite={Osoite}  Kapasiteet={Kapasiteet} bikesAvailable={availableBikes}/>
          </Marker>
     )
}