import { useEffect,useState } from "react";
import getStation from "../../Utils/Functions/getStation";
import secondsToTime from "../../Utils/Functions/secondsToTime";
interface Props{
   Departure: number;
  Return: number;
  DeparturedStationId: string;
  ReturnedStationId: string;
  CoveredDistance: number;
  Duration: number;
}

export default function ShowTrip({Departure,Return,DeparturedStationId,ReturnedStationId,CoveredDistance,Duration}: Props): JSX.Element{
     const [departureStation, setDepartureStation] = useState<string>("")
     const [arrivalStation, setArrivalStation] = useState<string>("")
     const [departureTime, setDepartureTime] = useState<string>()
     const [returnTime,setReturnTime]=useState<any>()

     useEffect(() => {
          getStation(DeparturedStationId).then(data => setDepartureStation(data.Name)).catch(err => setDepartureStation("We could not find the station"))
          getStation(ReturnedStationId).then(data => setArrivalStation(data.Name)).catch(err => setArrivalStation("We could not find the station"))
          setDepartureTime(new Date(Departure).toISOString().replace("T", " ").replace("Z", " ").replace(".000", ""))
          setReturnTime(new Date(Return).toISOString().replace("T", " ").replace("Z", " ").replace(".000", ""))
     }, [Departure, DeparturedStationId, Return, ReturnedStationId])
     return (
          <div>
               <h5>Departured: {departureTime}</h5>
               <h5>Returned: {returnTime}</h5>
               <h5>Departure station: {departureStation}</h5>
               <h5>Return station: {arrivalStation}</h5>
               <h5>Covered distance: {CoveredDistance}</h5>
               <h5>Duration: {secondsToTime(Duration)}</h5>
          </div>
)

}