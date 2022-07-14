import React, { useState,useEffect } from "react"
import getAvailableBikes from "../../Utils/Functions/getAvailableBikes"
interface Props{
     id:string
}

export default function BikesAvailable({id}:Props): JSX.Element{
     const [bikes, setBikes] = useState("unknown")
     useEffect(() => { 
          const getBikesAvailable = async () => {
               try {
                    const data = await getAvailableBikes(id)
                    setBikes(data.data.bikeRentalStation.bikesAvailable)
               } catch (err) {
                    setBikes("unknown")
               }
          }
          getBikesAvailable()
     },[id])
     return (
          <div>
               <h5>Available bikes: {bikes}</h5>
               </div>
     )
}
