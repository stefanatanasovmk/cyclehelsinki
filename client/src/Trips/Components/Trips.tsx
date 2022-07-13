import React, { useState, useEffect,useRef } from "react";
import Trip from "../../Utils/Interfaces/trip.interface";
import {v4 as uuidv4} from 'uuid';
import getTrips from "../../Utils/Functions/getTrips";
import ShowTrip from "./ShowTrip";
const length = 10;
const loading = <div><h1>Loading</h1></div>
export default function Trips(): JSX.Element{
     const [page, setPage] = useState<number>(1);
     const [trips, setTrips] = useState<Trip[]>([]);
     const ref = useRef(null)

     useEffect(() => {
          getTrips(10,1).then(data => setTrips(data)).catch(err => console.log(err))
    },[])
         
     return (
          <div>
               {trips.map(e => 
                    <ShowTrip key={e._id}
                    Departure={e.Departure}
                    Return={e.Return}
                    DeparturedStationId={e.DeparturedStationId}
                    ReturnedStationId={e.ReturnedStationId}
                    CoveredDistance={e.CoveredDistance}
                    Duration={e.Duration}    
                    />)}
                    
             <h1 ref={ref}> Loading....</h1>
           </div>
     )
}

   // const observer = new IntersectionObserver(entries => { 
     //      entries.forEach(entry => {
     //           if (entry.isIntersecting) {
     //                setPage(pre => pre + 1);
     //                getTrips(length, page).then(data => setTrips(pre => [...pre, ...data]));
     //           }
     //      }, {
     //           rootMargin:"0px 0px 50px 0px"
     //      })
     // })

     // if (ref.current !== null && ref.current !== undefined) {
     //      observer.observe(ref.current)
     // }