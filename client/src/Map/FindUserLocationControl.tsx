import Control from 'react-leaflet-custom-control'
import userLocationIcon from "./Icons/images/user-location.png"
import {useMap} from "react-leaflet"
interface Props{
     onClick: () => void
     pos: L.ControlPosition  
     isLocationShared: boolean
}

export default function FindUserLocationControl({isLocationShared, pos, onClick }: Props): JSX.Element{
     const map = useMap()
     const onClickHandler = () => {
          const coords = onClick()
          if (coords !== null && coords !== undefined && coords[0] !==60.1699 && coords[1]!== 24.9384){
               map.closePopup()
               map.setView(coords, 16)
          }
     }
     return (
       
          <Control  position={pos}>
                    <img className="FindUserIcon" src={userLocationIcon} width="30px" height="30px" alt="Find user location" onClick={onClickHandler}/>
               </Control>
        
     )
}


